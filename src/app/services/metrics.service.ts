import { Injectable } from '@angular/core';
import { BroilerRecord, CalculatedBroilerRecord, DashboardKpis } from '../models/broiler.models';
import { average, round, sum } from '../utils/math.helpers';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  calculateRecords(records: BroilerRecord[]): CalculatedBroilerRecord[] {
    return records.map((record) => {
      const aves_vivas = Math.max(record.aves_iniciales - record.aves_muertas, 0);
      const peso_total_kg = aves_vivas * record.peso_promedio_kg;
      const consumo_por_ave = aves_vivas > 0 ? record.alimento_consumido_kg / aves_vivas : 0;
      const mortalidad_porcentaje = record.aves_iniciales > 0 ? (record.aves_muertas / record.aves_iniciales) * 100 : 0;
      const supervivencia_porcentaje = record.aves_iniciales > 0 ? (aves_vivas / record.aves_iniciales) * 100 : 0;
      const fcr = peso_total_kg > 0 ? record.alimento_consumido_kg / peso_total_kg : 0;
      const ingresos_estimados = peso_total_kg * record.precio_venta_kg;
      const utilidad_estimada = ingresos_estimados - record.costo_alimento - record.otros_costos;
      const margen_porcentaje = ingresos_estimados > 0 ? (utilidad_estimada / ingresos_estimados) * 100 : 0;

      const alertas: string[] = [];

      if (mortalidad_porcentaje > 5) {
        alertas.push('Mortalidad mayor a 5%');
      }
      if (fcr > 2) {
        alertas.push('FCR mayor a 2.0');
      }
      if (utilidad_estimada < 0) {
        alertas.push('Utilidad estimada menor a 0');
      }
      if (record.peso_promedio_kg < this.expectedWeight(record.edad_dias) - 0.2) {
        alertas.push('Peso promedio bajo para la edad');
      }
      if (record.alimento_consumido_kg > record.aves_iniciales * 4.2 && record.peso_promedio_kg < 2.2) {
        alertas.push('Consumo alto de alimento con peso bajo');
      }

      const estado_alerta = this.getAlertState(alertas);

      return {
        ...record,
        aves_vivas: round(aves_vivas, 2),
        peso_total_kg: round(peso_total_kg, 2),
        consumo_por_ave: round(consumo_por_ave, 3),
        mortalidad_porcentaje: round(mortalidad_porcentaje, 2),
        supervivencia_porcentaje: round(supervivencia_porcentaje, 2),
        fcr: round(fcr, 2),
        ingresos_estimados: round(ingresos_estimados, 2),
        utilidad_estimada: round(utilidad_estimada, 2),
        margen_porcentaje: round(margen_porcentaje, 2),
        estado_alerta,
        alertas,
      };
    });
  }

  calculateKpis(records: CalculatedBroilerRecord[]): DashboardKpis {
    const avesIniciales = sum(records.map((record) => record.aves_iniciales));
    const avesMuertas = sum(records.map((record) => record.aves_muertas));
    const avesVivas = sum(records.map((record) => record.aves_vivas));
    const pesoTotal = sum(records.map((record) => record.peso_total_kg));
    const alimentoTotal = sum(records.map((record) => record.alimento_consumido_kg));
    const utilidadTotal = sum(records.map((record) => record.utilidad_estimada));
    const ingresosTotales = sum(records.map((record) => record.ingresos_estimados));

    return {
      mortalidad: avesIniciales > 0 ? round((avesMuertas / avesIniciales) * 100, 2) : 0,
      supervivencia: avesIniciales > 0 ? round((avesVivas / avesIniciales) * 100, 2) : 0,
      fcr: pesoTotal > 0 ? round(alimentoTotal / pesoTotal, 2) : 0,
      pesoPromedio: round(average(records.map((record) => record.peso_promedio_kg)), 2),
      pesoTotal: round(pesoTotal, 2),
      consumoAlimento: round(alimentoTotal, 2),
      utilidad: round(utilidadTotal, 2),
      margen: ingresosTotales > 0 ? round((utilidadTotal / ingresosTotales) * 100, 2) : 0,
    };
  }

  private expectedWeight(edadDias: number): number {
    if (edadDias <= 28) {
      return 1.5;
    }
    if (edadDias <= 35) {
      return 2.2;
    }

    return 2.5;
  }

  private getAlertState(alerts: string[]): 'normal' | 'alert' | 'critical' {
    if (!alerts.length) {
      return 'normal';
    }

    const criticalKeywords = ['Mortalidad', 'Utilidad'];
    const hasCritical = alerts.some((alert) => criticalKeywords.some((keyword) => alert.includes(keyword)));

    return hasCritical ? 'critical' : 'alert';
  }
}
