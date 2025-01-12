import React, { useEffect } from "react";

import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

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
  lng: localStorage.getItem("language") || "am",
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
  const navigate = useNavigate();

  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (["am", "en", "ru"].includes(pathLang)) {
      if (
        location.pathname === `/${pathLang}` ||
        location.pathname === `/${pathLang}/`
      ) {
        navigate(`/${pathLang}/home`, { replace: true });
      } else {
        i18n.changeLanguage(pathLang);
      }
    } else {
      const defaultLang = i18n.language || "am";
      navigate(`/${defaultLang}/home`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div
      className={` ${
        i18n.language == "en" ? "font-montserrat" : "font-montserratarm"
      } bg-[#080808] text-white`}
    >
      <CursorFollow />
      <MyContext.Provider value={{}}>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/:lang/" element={<Navigate to="/:lang/" replace />} />
            <Route exact path="/:lang/home" element={<Home />} />
            <Route exact path="/:lang/projects" element={<Projects />} />
            <Route exact path="/:lang/about" element={<About />} />
            <Route path="/:lang/project/:documentId" element={<Project />} />
            <Route exact path="/:lang/contacts" element={<ContactPage />} />
            <Route exact path="/:lang/services" element={<Services />} />
            <Route
              exact
              path="/:lang/services/:service"
              element={<Service />}
            />
          </Routes>
        </ApolloProvider>
      </MyContext.Provider>
    </div>
  );
};

export default App;
