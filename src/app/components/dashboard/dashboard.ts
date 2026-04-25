import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { FileUpload } from '../file-upload/file-upload';
import { EmptyState } from '../empty-state/empty-state';
import { KpiCards } from '../kpi-cards/kpi-cards';
import { Charts } from '../charts/charts';
import { Filters } from '../filters/filters';
import { Alerts } from '../alerts/alerts';
import { DataTable } from '../data-table/data-table';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, FileUpload, EmptyState, KpiCards, Charts, Filters, Alerts, DataTable, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  hasData = false;
}
