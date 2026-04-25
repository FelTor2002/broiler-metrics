export type AlertState = 'normal' | 'alert' | 'critical';

export interface BroilerRecord {
  fecha: string;
  lote: string;
  galpon: string;
  edad_dias: number;
  aves_iniciales: number;
  aves_muertas: number;
  peso_promedio_kg: number;
  alimento_consumido_kg: number;
  precio_venta_kg: number;
  costo_alimento: number;
  otros_costos: number;
}

export interface CalculatedBroilerRecord extends BroilerRecord {
  aves_vivas: number;
  peso_total_kg: number;
  consumo_por_ave: number;
  mortalidad_porcentaje: number;
  supervivencia_porcentaje: number;
  fcr: number;
  ingresos_estimados: number;
  utilidad_estimada: number;
  margen_porcentaje: number;
  estado_alerta: AlertState;
  alertas: string[];
}

export interface DashboardFilters {
  lote: string;
  galpon: string;
  fechaInicio: string;
  fechaFin: string;
  estado_alerta: 'all' | AlertState;
  busqueda: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface DashboardKpis {
  mortalidad: number;
  supervivencia: number;
  fcr: number;
  pesoPromedio: number;
  pesoTotal: number;
  consumoAlimento: number;
  utilidad: number;
  margen: number;
}
