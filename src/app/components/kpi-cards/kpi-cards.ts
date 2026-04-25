import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DashboardKpis } from '../../models/broiler.models';

@Component({
  selector: 'app-kpi-cards',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCards {
  @Input({ required: true }) kpis!: DashboardKpis;
}
