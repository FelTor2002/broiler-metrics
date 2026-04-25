import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalculatedBroilerRecord } from '../../models/broiler.models';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  @Input() records: CalculatedBroilerRecord[] = [];

  rankingScore(record: CalculatedBroilerRecord): number {
    return record.margen_porcentaje - record.fcr * 10;
  }
}
