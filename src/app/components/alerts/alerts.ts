import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { CalculatedBroilerRecord } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts implements OnChanges {
  @Input() records: CalculatedBroilerRecord[] = [];

  selectedTab: 'all' | 'critical' | 'alert' | 'normal' = 'all';
  visibleCount = 15;
  readonly pageStep = 15;
  private orderedRecords: CalculatedBroilerRecord[] = [];

  constructor(private readonly languageService: LanguageService) {}

  ngOnChanges(): void {
    this.orderedRecords = [...this.records].sort((a, b) => this.priority(b.estado_alerta) - this.priority(a.estado_alerta));
    this.visibleCount = this.pageStep;
  }

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

  get tabCountAll(): number {
    return this.records.length;
  }

  get visibleRecords(): CalculatedBroilerRecord[] {
    const filtered = this.filteredRecords();
    return filtered.slice(0, this.visibleCount);
  }

  get hasMore(): boolean {
    return this.filteredRecords().length > this.visibleCount;
  }

  setTab(tab: 'all' | 'critical' | 'alert' | 'normal'): void {
    this.selectedTab = tab;
    this.visibleCount = this.pageStep;
  }

  showMore(): void {
    this.visibleCount += this.pageStep;
  }

  statusLabel(status: 'normal' | 'alert' | 'critical'): string {
    return this.t(`status.${status}`);
  }

  private filteredRecords(): CalculatedBroilerRecord[] {
    if (this.selectedTab === 'all') {
      return this.orderedRecords;
    }

    return this.orderedRecords.filter((record) => record.estado_alerta === this.selectedTab);
  }

  private priority(status: 'normal' | 'alert' | 'critical'): number {
    if (status === 'critical') {
      return 3;
    }
    if (status === 'alert') {
      return 2;
    }
    return 1;
  }
}
