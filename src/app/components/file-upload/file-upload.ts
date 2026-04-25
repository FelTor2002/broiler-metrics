import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BroilerRecord } from '../../models/broiler.models';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  @Input() selectedFileName = '';
  @Input() loading = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() previewRecords: BroilerRecord[] = [];

  @Output() fileSelected = new EventEmitter<File>();
  @Output() clearData = new EventEmitter<void>();
  @Output() loadDemo = new EventEmitter<void>();
  @Output() downloadTemplate = new EventEmitter<void>();

  constructor(private readonly languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.translate(key);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.fileSelected.emit(file);
    input.value = '';
  }
}
