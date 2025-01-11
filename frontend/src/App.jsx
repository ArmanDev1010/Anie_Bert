import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translationAM, translationEN, translationRU } from "./languages";

import { MyContext } from "./context/MyContext";

import {
  Home,
  Project,
  About,
  Projects,
  Services,
  ContactPage,
  Service,
} from "./pages/index";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { CursorFollow } from "./components";

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
  lng: localStorage.getItem("language"),
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
  const location = useLocation();

  return (
    <div className="font-montserrat bg-[#080808] text-white">
      <CursorFollow />
      <MyContext.Provider value={{}}>
        <ApolloProvider client={client}>
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/project/:documentId" element={<Project />} />
            <Route exact path="/contacts" element={<ContactPage />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/services/:service" element={<Service />} />
          </Routes>
        </ApolloProvider>
      </MyContext.Provider>
    </div>
  );
};

export default App;
