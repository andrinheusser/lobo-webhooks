import { render } from "preact";
import "./style.css";
import LoginForm from "./components/LoginForm";
import ApiConnectionContextProvider, {
  apiConnectionState,
  useApiConnection,
} from "./context/ApiConnectionContext";
import WebhookEvents from "./components/WebhookEvents";
import Webhooks from "./components/Webhooks";

function AuthenticatedApp() {
  const { setApiConnectionToken } = useApiConnection();
  return (
    <div class={"divide-y p-4 flex flex-col gap-4"}>
      <div>
        <div>Working on env: {apiConnectionState.value.url}</div>

        <div>
          <button onClick={() => setApiConnectionToken("")}>Logout</button>
        </div>
      </div>
      <div class={"flex flex-row gap-4"}>
        <div>
          <WebhookEvents />
        </div>
        <div>
          <Webhooks />
        </div>
      </div>
    </div>
  );
}

function UnauthenticatedApp() {
  return <LoginForm />;
}

function AuthenticationGate() {
  const apiConnection = useApiConnection();
  if (apiConnection.apiConnectionState.value.token === "") {
    return <UnauthenticatedApp />;
  } else {
    return <AuthenticatedApp />;
  }
}

export function App() {
  return (
    <div>
      <ApiConnectionContextProvider>
        <AuthenticationGate />
      </ApiConnectionContextProvider>
    </div>
  );
}

render(<App />, document.getElementById("app"));
