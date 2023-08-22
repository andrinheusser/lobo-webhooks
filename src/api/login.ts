import { Buffer } from "buffer";
import { z } from "zod";

var postData = JSON.stringify([
  "webhook.read",
  "webhook.create",
  "webhook.delete",
  "webhookevent.read",
]);

const loginResponseSchema = z.object({
  status: z.literal("ok"),
  token: z.string(),
});

export default async function login(
  username: string,
  password: string,
  baseUrl: string,
): Promise<string> {
  const headers = new Headers();
  headers.set(
    "authorization",
    "Basic " + Buffer.from(username + ":" + password).toString("base64"),
  );

  headers.set("Content-Type", "application/json");
  const loginResponse = await fetch(`lobo/token`, {
    method: "POST",
    headers,
    body: postData,
  });
  console.log(loginResponse.status, loginResponse.statusText);

  const loginResponseData = loginResponseSchema.safeParse(
    await loginResponse.json(),
  );
  if (!loginResponseData.success) {
    alert("Login failed" + "\n" + loginResponse.statusText);
  }

  return loginResponseData.success ? loginResponseData.data.token : "";
}
