# Insight Board

> Dashboard de analítica moderno, bilingüe y responsive construido con Angular + TypeScript.

[🇪🇸 Español](#-español) | [🇺🇸 English](#-english)

---

## 🇪🇸 Español

### Descripción
**Insight Board** es un proyecto de portafolio orientado a frontend, data analytics y UX.
Incluye una interfaz tipo SaaS con tema oscuro, visualización de KPIs, gráficas interactivas, filtros y vistas adicionales para analítica, reportes y configuración.

### Demo local
- URL: `http://localhost:4200`

### Live demo
- Vercel: [https://insight-board-swart.vercel.app](https://insight-board-swart.vercel.app)

### Autor
**Felipe Torres**

### Funcionalidades principales
- Dashboard con KPIs:
  - Ventas Totales
  - Usuarios Activos
  - Tasa de Conversión
  - Crecimiento de Ingresos
- Visualización de datos:
  - Gráfica de línea (ventas mensuales)
  - Gráfica de barras (ingresos por categoría)
  - Gráfica doughnut (distribución por canal)
- Tabla de transacciones:
  - Columnas: ID, cliente, categoría, monto, estado, fecha
  - Estados visuales: Completado, Pendiente, Cancelado
- Filtros:
  - Por categoría
  - Por estado
  - Búsqueda por cliente
  - Rango de fecha
- Navegación por secciones (routing):
  - `Dashboard`
  - `Analytics`
  - `Reports`
  - `Settings`
- Internacionalización (i18n):
  - Español / Inglés
  - Formato de moneda y fecha por locale
- Exportación:
  - Reportes mensuales en **XLSX**

### Stack tecnológico
- Angular (componentes standalone)
- TypeScript
- CSS moderno (variables, layout responsive)
- Chart.js
- XLSX (`xlsx`) para exportación de reportes
- Datos mock locales

### Estructura del proyecto
```text
src/
  app/
    core/
      i18n.service.ts
    components/
      charts-panel/
      filter-bar/
      kpi-card/
      transactions-table/
    mock-data/
      dashboard.data.ts
    pages/
      dashboard-page/
      analytics-page/
      reports-page/
      settings-page/
    types/
      dashboard.types.ts
    app.ts
    app.html
    app.css
  styles.css
```

### Instalación
```bash
npm install
```

### Ejecutar en local
```bash
npm start
```

### Build
```bash
npm run build
```

### Tests
```bash
npx ng test --watch=false
```

### Flujo de ramas y commits recomendado
Se está usando un enfoque tipo **GitHub Flow + Conventional Commits**:
- Ramas por propósito: `feat/*`, `fix/*`, `docs/*`
- Commits claros: `feat: ...`, `fix: ...`, `docs: ...`
- PR por cambio acotado

### Mejoras futuras
- Optimizar tamaño del bundle (lazy loading para exportación XLSX)
- Paginación y ordenamiento en tabla
- Integración con backend real
- Exportación adicional (PDF)
- Autenticación y roles

---

## 🇺🇸 English

<details>
  <summary>Open English version</summary>

### Description
**Insight Board** is a portfolio project focused on frontend quality, data analytics, and UX.
It includes a modern SaaS-like dark UI with KPI cards, interactive charts, filters, and dedicated pages for analytics, reports, and settings.

### Local demo
- URL: `http://localhost:4200`

### Live demo
- Vercel: [https://insight-board-swart.vercel.app](https://insight-board-swart.vercel.app)

### Author
**Felipe Torres**

### Main features
- KPI dashboard (Total Sales, Active Users, Conversion Rate, Revenue Growth)
- Charts (line, bar, doughnut)
- Transactions table with status badges
- Filters (category, status, customer search, date range)
- Routed sections (`Dashboard`, `Analytics`, `Reports`, `Settings`)
- Bilingual UI (Spanish/English) with locale-aware formats
- Monthly report export in **XLSX**

### Tech stack
- Angular (standalone components)
- TypeScript
- Modern CSS
- Chart.js
- XLSX (`xlsx`) for report export
- Local mock data

### Setup
```bash
npm install
npm start
```

### Build and test
```bash
npm run build
npx ng test --watch=false
```

</details>
