import { inject, Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageService = inject(MessageService);

  private readonly DEFAULT_ERROR_TITLE = 'Ошибка';

  showHttpResponseError(err: HttpErrorResponse): void {
    const messageParams: Message = {
      severity: 'error',
      summary: this.DEFAULT_ERROR_TITLE,
      detail: err.message,
    };

    this.show(messageParams);
  }

  private show(messageParams: Message): void {
    this.messageService.add(messageParams);
  }
}
