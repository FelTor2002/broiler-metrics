# Broiler Metrics

## ES

### Nombre del proyecto
Broiler Metrics

### Descripción
Dashboard web profesional para analítica productiva y financiera en pollos de engorde. Permite cargar archivos Excel, validar estructura, procesar datos localmente y visualizar KPIs, alertas y gráficos interactivos.

### Demo
Live demo: _pendiente_

### Problema que resuelve
Facilita el seguimiento operativo de lotes avícolas en un panel único, con enfoque en eficiencia alimenticia, mortalidad, rentabilidad y toma de decisiones rápida.

### Funcionalidades
- Carga de Excel `.xlsx/.xls`
- Validación de columnas obligatorias
- Mensajes claros para errores de archivo vacío/formato/datos inválidos
- Preview de datos cargados
- Botón para datos demo
- Descarga de plantilla de Excel
- Cálculo local de métricas derivadas
- KPIs operativos y financieros
- Alertas por lote (normal/alerta/crítico)
- Filtros por lote, galpón, fecha, estado y búsqueda
- Tabla de ranking por eficiencia
- Gráficas interactivas (líneas, barras, doughnut)
- UI bilingüe ES/EN con persistencia en LocalStorage
- Layout responsive (desktop/tablet/mobile)

### Métricas calculadas
- mortalidad_%
- supervivencia_%
- FCR
- peso promedio
- peso total producido
- consumo de alimento
- ingresos estimados
- utilidad estimada
- margen %

### Estructura esperada del Excel
Columnas obligatorias:
- `fecha`
- `lote`
- `galpon`
- `edad_dias`
- `aves_iniciales`
- `aves_muertas`
- `peso_promedio_kg`
- `alimento_consumido_kg`
- `precio_venta_kg`
- `costo_alimento`
- `otros_costos`

### Tecnologías usadas
- Angular
- TypeScript
- CSS moderno (tema dashboard oscuro)
- SheetJS (`xlsx`)
- Chart.js + ng2-charts
- LocalStorage

### Estructura del proyecto
```txt
src/app/
  components/
  services/
  models/
  constants/
  i18n/
  data/
  utils/
```

### Instalación
```bash
npm install
```

### Ejecución local
```bash
npm start
```

### Build
```bash
npm run build
```

### Deploy (Vercel)
1. Importar el repositorio en Vercel.
2. Framework Preset: Angular.
3. Build command: `npm run build`.
4. Output directory: `dist/broiler-metrics/browser`.
5. Deploy.

### Flujo de ramas
- `main` como rama principal.
- Ramas por propósito (`feat/*`, `fix/*`, `docs/*`, `chore/*`).
- Integración progresiva por bloques funcionales.

### Conventional Commits
Se utiliza convención:
- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `refactor:`
- `merge:`

### Importante
- El procesamiento es local.
- No se suben datos a backend.
- El Excel se usa para análisis operativo de pollos de engorde.
- Proyecto orientado a portfolio frontend + data visualization.

### Mejoras futuras
- Exportar reportes en PDF
- Guardar sesiones de análisis
- Benchmark entre ciclos históricos
- Tests unitarios/e2e

### Autor
Felipe Torres

---

## EN

### Project name
Broiler Metrics

### Description
Professional web dashboard for broiler production and financial analytics. It allows users to upload Excel files, validate structure, process data locally, and visualize KPIs, alerts, and interactive charts.

### Live demo
Live demo: _coming soon_

### Problem solved
Helps poultry operations monitor broiler lot performance in a single dashboard focused on feed efficiency, mortality, profitability, and fast decision-making.

### Features
- Excel upload `.xlsx/.xls`
- Required-column validation
- Clear error messages (empty file/invalid format/invalid rows)
- Uploaded data preview
- Demo dataset quick load
- Downloadable Excel template
- Local derived-metrics engine
- Operational and financial KPIs
- Alert engine per lot (normal/alert/critical)
- Filters by lot, shed, date range, status, and search
- Efficiency ranking table
- Interactive charts (line, bar, doughnut)
- Bilingual UI (ES/EN) with LocalStorage persistence
- Responsive dashboard layout

### Calculated metrics
- mortality_%
- survival_%
- FCR
- average weight
- total produced weight
- feed consumption
- estimated revenue
- estimated profit
- margin %

### Expected Excel structure
Required columns:
- `fecha`
- `lote`
- `galpon`
- `edad_dias`
- `aves_iniciales`
- `aves_muertas`
- `peso_promedio_kg`
- `alimento_consumido_kg`
- `precio_venta_kg`
- `costo_alimento`
- `otros_costos`

### Technologies
- Angular
- TypeScript
- Modern CSS (dark SaaS dashboard)
- SheetJS (`xlsx`)
- Chart.js + ng2-charts
- LocalStorage

### Project structure
```txt
src/app/
  components/
  services/
  models/
  constants/
  i18n/
  data/
  utils/
```

### Setup
```bash
npm install
```

### Local development
```bash
npm start
```

### Build
```bash
npm run build
```

### Deployment (Vercel)
1. Import repository in Vercel.
2. Framework Preset: Angular.
3. Build command: `npm run build`.
4. Output directory: `dist/broiler-metrics/browser`.
5. Deploy.

### Branch workflow
- `main` as default branch.
- Purpose-based branches (`feat/*`, `fix/*`, `docs/*`, `chore/*`).
- Progressive integration by functional blocks.

### Conventional Commits
Convention used:
- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `refactor:`
- `merge:`

### Important
- Processing is local.
- No data is sent to any backend.
- Excel is used for broiler operational analytics.
- Portfolio-focused project for frontend + data visualization.

### Future improvements
- PDF export
- Saved analysis sessions
- Historical-cycle benchmarking
- Unit and e2e tests

### Author
Felipe Torres
