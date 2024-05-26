import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  root.render(
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  );
} else {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </React.StrictMode>
  );
}
