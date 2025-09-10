import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//VN
import viRegister from "./vi/register.json";
import viLogin from "./vi/login.json";
import viCommon from "./vi/common.json";
import viForgotPass from "./vi/forgotPass.json";

//US
import enRegister from "./en/register.json";
import enLogin from "./en/login.json";
import enCommon from "./en/common.json";
import enForgotPass from "./en/forgotPass.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        register: viRegister,
        login: viLogin,
        common: viCommon,
        forgotPass: viForgotPass,
      },
      en: {
        register: enRegister,
        login: enLogin,
        common: enCommon,
        forgotPass: enForgotPass,
      },
    },
    fallbackLng: "vi",
    ns: ["register", "login", "common", "forgotPass"],

    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
