import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { REQUIRED_EXCEL_COLUMNS } from '../constants/excel.constants';
import { DEMO_BROILER_DATA } from '../data/demo-data';
import { BroilerRecord } from '../models/broiler.models';
import { safeNumber } from '../utils/math.helpers';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  async parseExcel(file: File): Promise<BroilerRecord[]> {
    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      throw new Error('El archivo está vacío.');
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, string | number>>(worksheet, {
      defval: '',
      raw: false,
    });

    if (!rows.length) {
      throw new Error('El archivo está vacío.');
    }

    return rows.map((row) => ({
      fecha: String(row['fecha'] ?? ''),
      lote: String(row['lote'] ?? ''),
      galpon: String(row['galpon'] ?? ''),
      edad_dias: safeNumber(row['edad_dias']),
      aves_iniciales: safeNumber(row['aves_iniciales']),
      aves_muertas: safeNumber(row['aves_muertas']),
      peso_promedio_kg: safeNumber(row['peso_promedio_kg']),
      alimento_consumido_kg: safeNumber(row['alimento_consumido_kg']),
      precio_venta_kg: safeNumber(row['precio_venta_kg']),
      costo_alimento: safeNumber(row['costo_alimento']),
      otros_costos: safeNumber(row['otros_costos']),
    }));
  }

  loadDemoData(): BroilerRecord[] {
    return structuredClone(DEMO_BROILER_DATA);
  }

  downloadTemplate(): void {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        fecha: '2026-04-01',
        lote: 'L-201',
        galpon: 'A1',
        edad_dias: 35,
        aves_iniciales: 12000,
        aves_muertas: 350,
        peso_promedio_kg: 2.4,
        alimento_consumido_kg: 48000,
        precio_venta_kg: 1.84,
        costo_alimento: 16900,
        otros_costos: 4300,
      },
    ]);

    XLSX.utils.sheet_add_aoa(worksheet, [REQUIRED_EXCEL_COLUMNS as unknown as string[]], { origin: 'A1' });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'broiler_template');

    const output = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([output], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'broiler_template.xlsx';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
