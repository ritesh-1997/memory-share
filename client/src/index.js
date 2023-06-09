import React from "react";
import { createRoot } from "react-dom/client";

// init redux
import { Provider } from "react-redux";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./index.css";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const container = document.getElementById("root");
const root = createRoot(container);

// wraping google OAuth to the project.

root.render(
  <GoogleOAuthProvider clientId="671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
