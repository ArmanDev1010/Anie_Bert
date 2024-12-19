import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ScrollToTop from "./ScrollToTop.js";
import "./index.scss";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { BrowserRouter } from "react-router-dom";

i18next.init({
  interpolation: { escapeValue: false },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <App />
        <ScrollToTop />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
