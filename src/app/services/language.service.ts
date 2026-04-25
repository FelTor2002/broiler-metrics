import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/app.constants';
import { LanguageCode, translations } from '../i18n/translations';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly fallbackLanguage: LanguageCode = 'es';

  currentLanguage(): LanguageCode {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode | null;
    if (saved === 'es' || saved === 'en') {
      return saved;
    }

    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('en')) {
      return 'en';
    }

    return this.fallbackLanguage;
  }

  setLanguage(language: LanguageCode): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  translate(key: string, language: LanguageCode, params: Record<string, string | number> = {}): string {
    const selected = translations[language]?.[key] ?? translations[this.fallbackLanguage]?.[key] ?? key;

    if (typeof selected === 'function') {
      return selected(params);
    }

    return selected;
  }
}
