import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CalculatedBroilerRecord } from '../../models/broiler.models';

@Component({
  selector: 'app-charts',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.html',
  styleUrl: './charts.css',
})
export class Charts implements OnChanges {
  @Input() records: CalculatedBroilerRecord[] = [];

  lineWeightData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  lineMortalityData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  barFeedData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  barFcrData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  stateDistributionData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };

  lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#dbe6ff' } } },
    scales: {
      x: { ticks: { color: '#9db3df' }, grid: { color: 'rgba(157, 179, 223, 0.16)' } },
      y: { ticks: { color: '#9db3df' }, grid: { color: 'rgba(157, 179, 223, 0.16)' } },
    },
  };

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#dbe6ff' } } },
    scales: {
      x: { ticks: { color: '#9db3df' }, grid: { color: 'rgba(157, 179, 223, 0.16)' } },
      y: { ticks: { color: '#9db3df' }, grid: { color: 'rgba(157, 179, 223, 0.16)' } },
    },
  };

  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#dbe6ff' },
      },
    },
  };

  ngOnChanges(): void {
    this.buildCharts();
  }

  private buildCharts(): void {
    const sortedByAge = [...this.records].sort((a, b) => a.edad_dias - b.edad_dias);
    const labelsByAge = sortedByAge.map((record) => `D${record.edad_dias}`);

    this.lineWeightData = {
      labels: labelsByAge,
      datasets: [
        {
          label: 'Peso promedio (kg)',
          data: sortedByAge.map((record) => record.peso_promedio_kg),
          borderColor: '#4ec8ff',
          backgroundColor: 'rgba(78, 200, 255, 0.15)',
          fill: true,
          tension: 0.25,
        },
      ],
    };

    this.lineMortalityData = {
      labels: labelsByAge,
      datasets: [
        {
          label: 'Mortalidad %',
          data: sortedByAge.map((record) => record.mortalidad_porcentaje),
          borderColor: '#ef5b72',
          backgroundColor: 'rgba(239, 91, 114, 0.14)',
          fill: true,
          tension: 0.2,
        },
      ],
    };

    const byLote = [...this.records].sort((a, b) => a.lote.localeCompare(b.lote));
    const lotes = byLote.map((record) => record.lote);

    this.barFeedData = {
      labels: lotes,
      datasets: [
        {
          label: 'Consumo alimento (kg)',
          data: byLote.map((record) => record.alimento_consumido_kg),
          backgroundColor: 'rgba(83, 173, 255, 0.7)',
          borderRadius: 8,
        },
      ],
    };

    this.barFcrData = {
      labels: lotes,
      datasets: [
        {
          label: 'FCR por lote',
          data: byLote.map((record) => record.fcr),
          backgroundColor: 'rgba(125, 230, 173, 0.7)',
          borderRadius: 8,
        },
      ],
    };

    const normal = this.records.filter((record) => record.estado_alerta === 'normal').length;
    const alert = this.records.filter((record) => record.estado_alerta === 'alert').length;
    const critical = this.records.filter((record) => record.estado_alerta === 'critical').length;

    this.stateDistributionData = {
      labels: ['Normal', 'Alerta', 'Crítico'],
      datasets: [
        {
          data: [normal, alert, critical],
          backgroundColor: ['#24c98a', '#f3c748', '#ef5b72'],
          borderWidth: 0,
        },
      ],
    };
  }
}
