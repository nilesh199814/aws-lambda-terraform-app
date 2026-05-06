import * as dotenv from 'dotenv';
dotenv.config();
import {LambdaClient} from '@aws-sdk/client-lambda'

export const REGION = process.env.AWS_REGION;

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
if (!accessKeyId || !secretAccessKey) {
  throw new Error('AWS credentials are not set in environment variables');
}

export const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
});