import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalculatedBroilerRecord } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  @Input() records: CalculatedBroilerRecord[] = [];

  constructor(private readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.translate(key);
  }

  get normalCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'normal').length;
  }

  get alertCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'alert').length;
  }

  get criticalCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'critical').length;
  }

  statusLabel(status: 'normal' | 'alert' | 'critical'): string {
    return this.t(`status.${status}`);
  }
}
