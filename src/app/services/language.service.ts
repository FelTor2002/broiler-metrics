import { Injectable, signal } from '@angular/core';
import { STORAGE_KEYS } from '../constants/app.constants';
import { LanguageCode, translations } from '../i18n/translations';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly fallbackLanguage: LanguageCode = 'es';
  private readonly languageSignal = signal<LanguageCode>(this.resolveInitialLanguage());

  get language(): LanguageCode {
    return this.languageSignal();
  }

  setLanguage(language: LanguageCode): void {
    this.languageSignal.set(language);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  translate(key: string, params: Record<string, string | number> = {}): string {
    const currentLanguage = this.languageSignal();
    const selected = translations[currentLanguage]?.[key] ?? translations[this.fallbackLanguage]?.[key] ?? key;

    if (typeof selected === 'function') {
      return selected(params);
    }

    return selected;
  }

  private resolveInitialLanguage(): LanguageCode {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode | null;

    if (saved === 'es' || saved === 'en') {
      return saved;
    }

    const browserLanguage = navigator.language.toLowerCase();
    return browserLanguage.startsWith('en') ? 'en' : this.fallbackLanguage;
  }
}
