import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalculatedBroilerRecord } from '../../models/broiler.models';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  @Input() records: CalculatedBroilerRecord[] = [];

  get normalCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'normal').length;
  }

  get alertCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'alert').length;
  }

  get criticalCount(): number {
    return this.records.filter((record) => record.estado_alerta === 'critical').length;
  }
}
