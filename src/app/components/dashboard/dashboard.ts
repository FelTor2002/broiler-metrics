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
import { BroilerRecord } from '../../models/broiler.models';
import { ExcelService } from '../../services/excel.service';

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

  constructor(private readonly excelService: ExcelService) {}

  get hasData(): boolean {
    return this.records.length > 0;
  }

  async onFileSelected(file: File): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      this.records = await this.excelService.parseExcel(file);
      this.selectedFileName = file.name;
      this.successMessage = `Loaded ${this.records.length} records successfully.`;
    } catch (error) {
      this.records = [];
      this.selectedFileName = '';
      this.errorMessage = error instanceof Error ? error.message : 'Unknown Excel parsing error.';
    } finally {
      this.loading = false;
    }
  }

  onLoadDemo(): void {
    this.records = this.excelService.loadDemoData();
    this.selectedFileName = 'demo-broiler-data';
    this.errorMessage = '';
    this.successMessage = `Loaded ${this.records.length} demo records.`;
  }

  onClearData(): void {
    this.records = [];
    this.selectedFileName = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  onDownloadTemplate(): void {
    this.excelService.downloadTemplate();
  }
}
