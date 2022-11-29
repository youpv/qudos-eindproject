import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthContextProvider>
		<UserContextProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</UserContextProvider>
	</AuthContextProvider>
);


serviceWorkerRegistration.register();