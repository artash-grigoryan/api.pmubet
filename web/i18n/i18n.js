import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from './locales/en';
import fr from './locales/fr';
import pt from './locales/pt';
import mg from './locales/mg';
//import hy from './locales/hy';
//import ru from './locales/ru';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: en
            },
            fr: {
                translations: fr
            },
            pt: {
                translations: pt
            },
            mg: {
                translations: mg
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
