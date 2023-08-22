import { useState } from "preact/hooks";
import { useApiConnection } from "../context/ApiConnectionContext";
import login from "../api/login";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const apiConnection = useApiConnection();

  const handleLoginClick = async () => {
    const token = await login(
      username,
      password,
      apiConnection.apiConnectionState.value.url
    );
    apiConnection.setApiConnectionToken(token);
  };

  return (
    <div class="flex flex-col gap-1">
      <div class="flex flex-col gap-1">
        <label for="username">Lobo URL</label>
        <input
          id="url"
          type="text"
          value={apiConnection.apiConnectionState.value.url}
          readOnly={true}
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="username">Lobo API Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="password">Lobo API Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="flex flex-col gap-1">
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}
