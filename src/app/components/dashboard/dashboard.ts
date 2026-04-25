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
import { BroilerRecord, CalculatedBroilerRecord, DashboardKpis } from '../../models/broiler.models';
import { ExcelService } from '../../services/excel.service';
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
  ) {}

  get hasData(): boolean {
    return this.records.length > 0;
  }

  async onFileSelected(file: File): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const records = await this.excelService.parseExcel(file);
      this.updateDataset(records);
      this.selectedFileName = file.name;
      this.successMessage = `Loaded ${this.records.length} records successfully.`;
    } catch (error) {
      this.records = [];
      this.calculatedRecords = [];
      this.selectedFileName = '';
      this.errorMessage = error instanceof Error ? error.message : 'Unknown Excel parsing error.';
    } finally {
      this.loading = false;
    }
  }

  onLoadDemo(): void {
    this.updateDataset(this.excelService.loadDemoData());
    this.selectedFileName = 'demo-broiler-data';
    this.errorMessage = '';
    this.successMessage = `Loaded ${this.records.length} demo records.`;
  }

  onClearData(): void {
    this.records = [];
    this.calculatedRecords = [];
    this.selectedFileName = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  onDownloadTemplate(): void {
    this.excelService.downloadTemplate();
  }

  private updateDataset(records: BroilerRecord[]): void {
    this.records = records;
    this.calculatedRecords = this.metricsService.calculateRecords(records);
    this.kpis = this.metricsService.calculateKpis(this.calculatedRecords);
  }
}
