import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { EXCEL_MIME_TYPES, REQUIRED_EXCEL_COLUMNS } from '../constants/excel.constants';
import { DEMO_BROILER_DATA } from '../data/demo-data';
import { BroilerRecord } from '../models/broiler.models';
import { safeNumber } from '../utils/math.helpers';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  async parseExcel(file: File): Promise<BroilerRecord[]> {
    this.validateFileType(file);

    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      throw new Error('upload.error.empty');
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const headers = this.extractHeaders(worksheet);
    this.validateRequiredColumns(headers);

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
      defval: '',
      raw: false,
    });

    if (!rows.length) {
      throw new Error('upload.error.empty');
    }

    const records = rows.map((row) => this.toRecord(this.normalizeRowKeys(row)));
    this.validateRows(records);

    return records;
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

  private validateFileType(file: File): void {
    const hasValidMimeType = EXCEL_MIME_TYPES.includes(file.type);
    const hasValidExtension = /\.(xlsx|xls)$/i.test(file.name);

    if (!hasValidMimeType && !hasValidExtension) {
      throw new Error('upload.error.invalidType');
    }
  }

  private extractHeaders(worksheet: XLSX.WorkSheet): string[] {
    const rows = XLSX.utils.sheet_to_json<(string | null)[]>(worksheet, {
      header: 1,
      raw: false,
      blankrows: false,
    });

    const firstRow = rows[0] ?? [];

    return firstRow.map((value) => String(value ?? '').trim().toLowerCase()).filter(Boolean);
  }

  private validateRequiredColumns(headers: string[]): void {
    const missingColumns = REQUIRED_EXCEL_COLUMNS.filter((column) => !headers.includes(column));

    if (missingColumns.length) {
      throw new Error(`upload.error.columns|${missingColumns.join(', ')}`);
    }
  }

  private normalizeRowKeys(row: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(row).reduce<Record<string, unknown>>((accumulator, [key, value]) => {
      accumulator[key.trim().toLowerCase()] = value;
      return accumulator;
    }, {});
  }

  private toRecord(row: Record<string, unknown>): BroilerRecord {
    return {
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
    };
  }

  private validateRows(records: BroilerRecord[]): void {
    const invalidIndexes: number[] = [];

    records.forEach((record, index) => {
      const hasBaseText = Boolean(record.fecha.trim()) && Boolean(record.lote.trim()) && Boolean(record.galpon.trim());
      const hasPositiveBase =
        record.edad_dias >= 0 &&
        record.aves_iniciales > 0 &&
        record.aves_muertas >= 0 &&
        record.aves_muertas <= record.aves_iniciales;
      const hasNumericValues =
        record.peso_promedio_kg > 0 &&
        record.alimento_consumido_kg >= 0 &&
        record.precio_venta_kg >= 0 &&
        record.costo_alimento >= 0 &&
        record.otros_costos >= 0;

      if (!hasBaseText || !hasPositiveBase || !hasNumericValues) {
        invalidIndexes.push(index + 2);
      }
    });

    if (invalidIndexes.length) {
      const previewRows = invalidIndexes.slice(0, 8).join(', ');
      throw new Error(`upload.error.invalidData|${previewRows}`);
    }
  }
}
