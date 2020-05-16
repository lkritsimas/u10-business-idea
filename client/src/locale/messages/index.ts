import en from './en';
import sv from './sv';

export interface Messages {
  [locale: string]: {
    [key: string]: string;
  };
}

export default {
  en,
  sv,
} as Messages;
