import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalculatedBroilerRecord } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  @Input() records: CalculatedBroilerRecord[] = [];

  constructor(private readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.translate(key);
  }

  statusLabel(status: 'normal' | 'alert' | 'critical'): string {
    return this.t(`status.${status}`);
  }
}
