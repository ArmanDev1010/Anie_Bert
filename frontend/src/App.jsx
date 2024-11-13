import React from "react";

import { Route, Routes } from "react-router-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translationAM, translationEN, translationRU } from "./languages";

import { MyContext } from "./context/MyContext";

import { Home } from "./pages/index";
import Review from "./pages/Review";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const resources = {
  am: {
    translation: translationAM,
  },
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("anie_language"),
  fallbackLng: "am",
  interpolation: {
    escapeValue: false,
  },
});

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div className="font-montserrat">
      <MyContext.Provider value={{}}>
        <ApolloProvider client={client}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/review/:documentId" element={<Review />} />
          </Routes>
        </ApolloProvider>
      </MyContext.Provider>
    </div>
  );
};

export default App;
