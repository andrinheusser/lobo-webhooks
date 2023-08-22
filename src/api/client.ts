import { apiConnectionState, logout } from "../context/ApiConnectionContext";

export default async function (
  url: string,
  options: RequestInit,
): Promise<Response> {
  const headers = new Headers();
  headers.set("authorization", "Bearer " + apiConnectionState.value.token);
  headers.set("Content-Type", "application/json");

  let targetUrl = "lobo/" + url;

  const response = await fetch(targetUrl, {
    ...options,
    headers,
  });
  if (response.status === 401) {
    logout();
  }
  if (!response.ok) {
    console.log(response.status, response.statusText);
    throw new Error(response.statusText);
  }
  return response;
}
