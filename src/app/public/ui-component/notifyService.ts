import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private messageService: MessageService) {}

  showInfo(data?: any) {
    this.messageService.add({ severity: 'info', summary: data.summary, detail: data.detail || 'Info message' });
  }

  showWarn(data?: any) {
    this.messageService.add({ severity: 'warn', summary: data.summary, detail: data.detail || 'Warning message' });
  }

  showError(data?: any) {
    this.messageService.add({ severity: 'error', summary: data.summary, detail: data.detail || 'Error occurred' });
  }

  showSuccess(data?: any) {
    this.messageService.add({ severity: 'success', summary: data.summary, detail: data.detail || 'Action successful' });
  }
}
