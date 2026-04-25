export const REQUIRED_EXCEL_COLUMNS = [
  'fecha',
  'lote',
  'galpon',
  'edad_dias',
  'aves_iniciales',
  'aves_muertas',
  'peso_promedio_kg',
  'alimento_consumido_kg',
  'precio_venta_kg',
  'costo_alimento',
  'otros_costos',
] as const;

export const EXCEL_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
