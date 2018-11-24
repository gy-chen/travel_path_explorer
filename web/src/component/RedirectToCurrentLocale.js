import React from "react";
import { Redirect } from "react-router-dom";
import { negotiateLanguages } from "../i18n";

const RedirectToCurrentLocale = () => {
  const currentLocale = negotiateLanguages(navigator.languages)[0];
  return <Redirect to={`/${currentLocale}`} />;
};

export default RedirectToCurrentLocale;
