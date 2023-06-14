import * as translations from './translations';

class TranslateService {

  defaultLanguage = null;

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.installationLanguage(this.config?.defaultLanguage);
  }

  /**
   * Перевод текста
   * @param lang {String} код языка
   * @param text {String} текст
   * @param plural {String} текст
   * @returns {string} переведенный текст
   */
  t(text, plural, lang) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  };

  /**
   * установка языка
   * @param language {String} код языка
   */

  installationLanguage(language) {
    this.defaultLanguage = language;

    //устанавливает заголовок в АПИ
    this.services.api.setHeader('X-Lang', this.defaultLanguage);

    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.defaultLanguage);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }
}

export default TranslateService;
