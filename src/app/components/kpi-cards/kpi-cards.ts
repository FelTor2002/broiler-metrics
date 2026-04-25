import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardKpis } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-kpi-cards',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCards {
  @Input({ required: true }) kpis!: DashboardKpis;

  constructor(private readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.translate(key);
  }
}
