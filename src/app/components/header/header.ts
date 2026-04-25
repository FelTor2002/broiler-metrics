import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private readonly languageService: LanguageService) {}

  get language(): 'es' | 'en' {
    return this.languageService.language;
  }

  setLanguage(language: 'es' | 'en'): void {
    this.languageService.setLanguage(language);
  }

  t(key: string, params: Record<string, string | number> = {}): string {
    return this.languageService.translate(key, params);
  }
}
