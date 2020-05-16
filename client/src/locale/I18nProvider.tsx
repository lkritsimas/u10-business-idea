import React, {
  ReactNode, Fragment, createContext, useState,
} from 'react';
import { IntlProvider } from 'react-intl';
import _messages from './messages';
import _languages from './languages';

interface Props {
  children: ReactNode;
}

export const defaultLanguage = 'en';
export const languages = _languages;
export const LocaleContext: any = createContext([]);

export const I18nProvider: React.FC<Props> = ({ children }: Props) => {
  // Get browser language
  const navLanguage: string = navigator.language.split(/[-_]/)[0];

  // Check if browser language has existing translation, otherwise use default
  const language: string = _messages[navLanguage] ? navLanguage : defaultLanguage;
  const [locale, setLocale] = useState(localStorage.getItem('language') || language);

  const selectLanguage = (value: string): void => {
    const newLanguage: string = _messages[value] ? value : defaultLanguage;
    setLocale(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LocaleContext.Provider value={[locale, selectLanguage]}>
      <IntlProvider textComponent={Fragment} locale={locale} messages={_messages[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
