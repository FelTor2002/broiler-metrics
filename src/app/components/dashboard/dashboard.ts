import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Alerts } from '../alerts/alerts';
import { Charts } from '../charts/charts';
import { DataTable } from '../data-table/data-table';
import { EmptyState } from '../empty-state/empty-state';
import { FileUpload } from '../file-upload/file-upload';
import { Filters } from '../filters/filters';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { KpiCards } from '../kpi-cards/kpi-cards';
import { BroilerRecord, CalculatedBroilerRecord, DashboardFilters, DashboardKpis } from '../../models/broiler.models';
import { ExcelService } from '../../services/excel.service';
import { LanguageService } from '../../services/language.service';
import { MetricsService } from '../../services/metrics.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, FileUpload, EmptyState, KpiCards, Charts, Filters, Alerts, DataTable, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  selectedFileName = '';
  loading = false;
  errorMessage = '';
  successMessage = '';
  records: BroilerRecord[] = [];
  calculatedRecords: CalculatedBroilerRecord[] = [];
  filteredRecords: CalculatedBroilerRecord[] = [];
  filters: DashboardFilters = {
    lote: 'all',
    galpon: 'all',
    fechaInicio: '',
    fechaFin: '',
    estado_alerta: 'all',
    busqueda: '',
  };
  kpis: DashboardKpis = {
    mortalidad: 0,
    supervivencia: 0,
    fcr: 0,
    pesoPromedio: 0,
    pesoTotal: 0,
    consumoAlimento: 0,
    utilidad: 0,
    margen: 0,
  };

  constructor(
    private readonly excelService: ExcelService,
    private readonly metricsService: MetricsService,
    private readonly languageService: LanguageService,
  ) {}

  get hasData(): boolean {
    return this.records.length > 0;
  }

  async onFileSelected(file: File): Promise<void> {
    const startedAt = performance.now();
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const records = await this.excelService.parseExcel(file);
      this.updateDataset(records);
      this.selectedFileName = file.name;
      const elapsedMs = Math.round(performance.now() - startedAt);
      this.successMessage = `${this.t('upload.success', { count: this.records.length })} (${elapsedMs} ms)`;
    } catch (error) {
      this.records = [];
      this.calculatedRecords = [];
      this.filteredRecords = [];
      this.selectedFileName = '';
      this.errorMessage = this.mapError(error);
    } finally {
      this.loading = false;
    }
  }

  onLoadDemo(): void {
    this.updateDataset(this.excelService.loadDemoData());
    this.selectedFileName = 'demo-broiler-data';
    this.errorMessage = '';
    this.successMessage = this.t('upload.successDemo', { count: this.records.length });
  }

  onClearData(): void {
    this.records = [];
    this.calculatedRecords = [];
    this.filteredRecords = [];
    this.selectedFileName = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  onDownloadTemplate(): void {
    this.excelService.downloadTemplate();
  }

  onFiltersChange(filters: DashboardFilters): void {
    this.filters = filters;
    this.applyFilters();
  }

  private updateDataset(records: BroilerRecord[]): void {
    this.records = records;
    this.calculatedRecords = this.metricsService.calculateRecords(records);
    this.filteredRecords = [...this.calculatedRecords];
    this.kpis = this.metricsService.calculateKpis(this.calculatedRecords);
  }

  private applyFilters(): void {
    const query = this.filters.busqueda.trim().toLowerCase();

    this.filteredRecords = this.calculatedRecords
      .filter((record) => (this.filters.lote === 'all' ? true : record.lote === this.filters.lote))
      .filter((record) => (this.filters.galpon === 'all' ? true : record.galpon === this.filters.galpon))
      .filter((record) => (this.filters.estado_alerta === 'all' ? true : record.estado_alerta === this.filters.estado_alerta))
      .filter((record) => (this.filters.fechaInicio ? record.fecha >= this.filters.fechaInicio : true))
      .filter((record) => (this.filters.fechaFin ? record.fecha <= this.filters.fechaFin : true))
      .filter((record) => {
        if (!query) {
          return true;
        }

        return record.lote.toLowerCase().includes(query) || record.galpon.toLowerCase().includes(query);
      })
      .sort((a, b) => b.margen_porcentaje - a.margen_porcentaje);

    this.kpis = this.metricsService.calculateKpis(this.filteredRecords);
  }

  private t(key: string, params: Record<string, string | number> = {}): string {
    return this.languageService.translate(key, params);
  }

  private mapError(error: unknown): string {
    if (!(error instanceof Error)) {
      return 'Unexpected error.';
    }

    const [code, payload] = error.message.split('|');

    if (code === 'upload.error.columns') {
      return this.t(code, { missing: payload ?? '-' });
    }

    if (code === 'upload.error.invalidData') {
      return this.t(code, { rows: payload ?? '-' });
    }

    const translated = this.t(code);
    return translated === code ? this.t('upload.error.generic') : translated;
  }
}
