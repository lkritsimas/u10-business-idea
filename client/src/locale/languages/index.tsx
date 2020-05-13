import en from './en';
import sv from './sv';

export interface Languages {
  [locale: string]: {
    [key: string]: string;
  };
}

export default {
  en,
  sv,
} as Languages;
