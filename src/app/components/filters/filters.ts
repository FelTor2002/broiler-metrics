import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatedBroilerRecord, DashboardFilters } from '../../models/broiler.models';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters implements OnChanges {
  @Input() records: CalculatedBroilerRecord[] = [];
  @Input() filters: DashboardFilters = {
    lote: 'all',
    galpon: 'all',
    fechaInicio: '',
    fechaFin: '',
    estado_alerta: 'all',
    busqueda: '',
  };

  @Output() filtersChange = new EventEmitter<DashboardFilters>();

  lotes: string[] = [];
  galpones: string[] = [];

  ngOnChanges(): void {
    this.lotes = [...new Set(this.records.map((record) => record.lote))].sort((a, b) => a.localeCompare(b));
    this.galpones = [...new Set(this.records.map((record) => record.galpon))].sort((a, b) => a.localeCompare(b));
  }

  apply(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  clear(): void {
    this.filters = {
      lote: 'all',
      galpon: 'all',
      fechaInicio: '',
      fechaFin: '',
      estado_alerta: 'all',
      busqueda: '',
    };
    this.apply();
  }
}
