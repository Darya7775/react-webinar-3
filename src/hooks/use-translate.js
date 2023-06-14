import {useLayoutEffect, useMemo, useState, useCallback} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices();
  const [lang, setLanguage] = useState(services.translate.defaultLanguage);

  const unsubscribe = useMemo(() => {
    return services.translate.subscribe(() => {
      setLanguage(services.translate.defaultLanguage);
    });
  }, []);

  console.log(services.translate)

  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  const setLang = useCallback((language) => {
    services.translate.installationLanguage(language);
  }, []);

  const t = useCallback((text, plural) => {
    return services.translate.t(text, plural, lang);
  }, [services.translate.defaultLanguage]);

  return {lang, t, setLang};
}
