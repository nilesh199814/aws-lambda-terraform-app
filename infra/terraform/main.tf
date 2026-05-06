terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.10"
    }
  }
}

provider "aws" {
  region = var.region
  profile = "nilesh-personal"
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_app_exec_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../dist/src/lambda"
  output_path = "${path.module}/../../build/lambda.zip"
}

resource "aws_lambda_function" "app" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "lambda-app-demo"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "testLambda-1.handler"
  runtime          = "nodejs24.x"
  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)
}

output "lambda_function_name" {
  value = aws_lambda_function.app.function_name
}
