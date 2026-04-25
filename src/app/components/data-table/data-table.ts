import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { AlertState, CalculatedBroilerRecord } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable implements OnChanges {
  @Input() records: CalculatedBroilerRecord[] = [];

  selectedStatus: 'all' | AlertState = 'all';
  pageSize = 20;
  page = 1;

  readonly pageSizeOptions = [10, 20, 50, 100];

  constructor(private readonly languageService: LanguageService) {}

  ngOnChanges(): void {
    this.page = 1;
  }

  t(key: string): string {
    return this.languageService.translate(key);
  }

  statusLabel(status: AlertState): string {
    return this.t(`status.${status}`);
  }

  setStatus(status: 'all' | AlertState): void {
    this.selectedStatus = status;
    this.page = 1;
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.page = 1;
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
    }
  }

  get totalPages(): number {
    const total = this.filteredRecords.length;
    return total > 0 ? Math.ceil(total / this.pageSize) : 1;
  }

  get pagedRecords(): CalculatedBroilerRecord[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredRecords.slice(start, start + this.pageSize);
  }

  get startIndex(): number {
    return (this.page - 1) * this.pageSize;
  }

  globalRank(record: CalculatedBroilerRecord): number {
    const index = this.filteredRecords.findIndex(
      (item) => item.fecha === record.fecha && item.lote === record.lote && item.galpon === record.galpon,
    );

    return index >= 0 ? index + 1 : 0;
  }

  private get filteredRecords(): CalculatedBroilerRecord[] {
    if (this.selectedStatus === 'all') {
      return this.records;
    }

    return this.records.filter((record) => record.estado_alerta === this.selectedStatus);
  }
}
