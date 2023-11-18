import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import ru from "./ru/ru.json";
import tj from "./tj/tj.json";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: "tj",
    resources: {
        ru: ru,
        tj: tj,
    },
    react: {
        useSuspense: false
    }
})
