import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ErrorValidation } from '../../model/error-validation/error-validation';

@Component({
  selector: 'error-notification',
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.scss',
  providers: [MessageService],
})
export class ErrorNotificationComponent implements OnChanges {
  @Input() errorValidation!: ErrorValidation;

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const validations = changes['errorValidation'];
    this.addMultiple(validations['currentValue'])
  }

  addMultiple(validation: ErrorValidation) {
    const campos = validation?.campos || [];
    const messages = campos.map((i) => ({
      severity: 'error',
      summary: `${i.nome?.toUpperCase()}:`,
      detail: i.mensagem,
    }));
    this.messageService.addAll(messages);
  }
}
