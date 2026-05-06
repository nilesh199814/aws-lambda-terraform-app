import { InvokeCommand } from "@aws-sdk/client-lambda";
import { lambdaClient } from "./config.js";

async function invoke() {
  const command = new InvokeCommand({
    FunctionName: "testLambda",
    Payload: Buffer.from(JSON.stringify({ name: "Nilesh" })),
  });

  const res = await lambdaClient.send(command);

  let payload = "";

  if (res.Payload) {
    payload = Buffer.from(res.Payload as Uint8Array).toString();
  }

  console.log("Lambda response:", payload);
}

invoke();