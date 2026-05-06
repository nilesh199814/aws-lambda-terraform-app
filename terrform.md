Running Terraform is simple once your basics are set—but if you skip steps, it breaks fast. Here’s the exact flow used in real projects.

---

# 1. Install Terraform (one-time)

Check if already installed:

```bash
terraform -v
```

If not:

* Mac: `brew install terraform`
* Linux: download from HashiCorp site + add to PATH
* Windows: install via zip or choco

---

# 2. Create your first Terraform file

Create `main.tf`:

```hcl
provider "aws" {
  region  = "ap-south-1"
  profile = "default"
}

resource "aws_s3_bucket" "demo" {
  bucket = "my-terraform-demo-bucket-12345"
}
```

---

# 3. Initialize Terraform (MANDATORY)

```bash
terraform init
```

What it does:

* Downloads AWS provider
* Prepares `.terraform/` folder

👉 If you skip this → nothing works

---

# 4. Validate config (optional but smart)

```bash
terraform validate
```

---

# 5. Preview changes (VERY IMPORTANT)

```bash
terraform plan
```

Shows:

* What will be created
* What will change
* What will be destroyed

👉 Never skip in production

---

# 6. Apply (actually create resources)

```bash
terraform apply
```

It will ask:

```bash
Do you want to perform these actions?
```

Type:

```bash
yes
```

Now resources are created in Amazon Web Services

---

# 7. Destroy resources (cleanup)

```bash
terraform destroy
```

---

# 8. Real-world workflow (don’t ignore this)

In real projects:

```bash
terraform init
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
```

Why?

* Prevents accidental changes
* Ensures consistency in CI/CD

---

# 9. Common mistakes (you will hit these)

### Credentials error

Fix:

```bash
aws configure
```

### Bucket name already exists

S3 bucket names are global → change name

### Forgot region/profile

Terraform fails silently sometimes → always define

---

# 10. Folder structure (basic)

```
project/
├── main.tf
├── variables.tf
├── outputs.tf
└── terraform.tfstate
```

