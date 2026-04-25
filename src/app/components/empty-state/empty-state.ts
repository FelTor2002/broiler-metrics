import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  @Output() loadDemo = new EventEmitter<void>();

  constructor(private readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.translate(key);
  }
}
