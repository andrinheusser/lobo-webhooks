import { signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

interface ApiConnectionContextState {
  url: string;
  token: string;
}

interface ApiConnectionContext {
  apiConnectionState: typeof apiConnectionState;
  setApiConnectionUrl: (url: string) => void;
  setApiConnectionToken: (token: string) => void;
}

const defaultApiConnectionState: ApiConnectionContextState = {
  url: import.meta.env.VITE_LOBO_BASE_URL,
  token: "",
};

export const apiConnectionState = signal(defaultApiConnectionState);

function setApiConnectionUrl(url: string) {
  apiConnectionState.value = {
    ...apiConnectionState.value,
    url,
  };
}
function setApiConnectionToken(token: string) {
  apiConnectionState.value = {
    ...apiConnectionState.value,
    token: token,
  };
}

export function logout() {
  setApiConnectionToken("");
}

const defaultApiConnectionContextValue: ApiConnectionContext = {
  apiConnectionState,
  setApiConnectionUrl,
  setApiConnectionToken,
};

const ApiConnectionContext = createContext(defaultApiConnectionContextValue);

function ApiConnectionContextProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <ApiConnectionContext.Provider value={defaultApiConnectionContextValue}>
      {children}
    </ApiConnectionContext.Provider>
  );
}

export function useApiConnection() {
  const context = useContext(ApiConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useApiConnection must be used within a ApiConnectionContextProvider"
    );
  }
  return context;
}

export default ApiConnectionContextProvider;
