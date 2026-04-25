import { AlertState } from '../models/broiler.models';

export type LanguageCode = 'es' | 'en';

export type TranslationValue = string | ((params: Record<string, string | number>) => string);

export type TranslationMap = Record<string, TranslationValue>;

export const translations: Record<LanguageCode, TranslationMap> = {
  es: {
    'app.title': 'Broiler Metrics',
    'app.subtitle': 'Analítica productiva para pollos de engorde',
    'common.language': 'Idioma',
    'common.es': 'ES',
    'common.en': 'EN',
    'common.noData': 'Sin datos',
    'common.clear': 'Limpiar',
    'common.loading': 'Cargando...',
    'status.normal': 'Normal',
    'status.alert': 'Alerta',
    'status.critical': 'Crítico',
    'footer.text': 'Procesamiento local sin backend. Portfolio de Felipe Torres.',
    'empty.title': 'Carga un archivo para iniciar el análisis',
    'empty.description': 'Sube un Excel con datos de lotes o usa el demo para ver el dashboard completo.',
    'empty.cta': 'Cargar datos demo',
    'upload.title': 'Carga de Excel',
    'upload.description': 'Formatos permitidos: .xlsx, .xls',
    'upload.select': 'Seleccionar archivo',
    'upload.change': 'Cambiar archivo',
    'upload.template': 'Descargar plantilla',
    'upload.demo': 'Cargar datos demo',
    'upload.success': 'Archivo cargado correctamente.',
    'upload.error.empty': 'El archivo está vacío.',
    'upload.error.invalidType': 'Formato inválido. Usa .xlsx o .xls.',
    'upload.error.columns': ({ missing }) => `Faltan columnas obligatorias: ${missing}`,
    'upload.error.invalidData': 'Se encontraron filas con datos inválidos.',
  },
  en: {
    'app.title': 'Broiler Metrics',
    'app.subtitle': 'Production analytics for broiler chickens',
    'common.language': 'Language',
    'common.es': 'ES',
    'common.en': 'EN',
    'common.noData': 'No data',
    'common.clear': 'Clear',
    'common.loading': 'Loading...',
    'status.normal': 'Normal',
    'status.alert': 'Alert',
    'status.critical': 'Critical',
    'footer.text': 'Local processing without backend. Portfolio by Felipe Torres.',
    'empty.title': 'Upload a file to start analytics',
    'empty.description': 'Upload an Excel file with broiler lot data or use demo records to preview the full dashboard.',
    'empty.cta': 'Load demo data',
    'upload.title': 'Excel upload',
    'upload.description': 'Allowed formats: .xlsx, .xls',
    'upload.select': 'Select file',
    'upload.change': 'Replace file',
    'upload.template': 'Download template',
    'upload.demo': 'Load demo data',
    'upload.success': 'File uploaded successfully.',
    'upload.error.empty': 'The file is empty.',
    'upload.error.invalidType': 'Invalid format. Use .xlsx or .xls.',
    'upload.error.columns': ({ missing }) => `Missing required columns: ${missing}`,
    'upload.error.invalidData': 'Invalid rows were found.',
  },
};

export const ALERT_STATE_COLORS: Record<AlertState, string> = {
  normal: '#24c98a',
  alert: '#f3c748',
  critical: '#ef5b72',
};
