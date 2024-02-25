import { Component, Input } from '@angular/core';
import { ErrorValidation } from '../../model/error-validation/error-validation';

@Component({
  selector: 'error-notification',
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.scss'
})
export class ErrorNotificationComponent {
  @Input() errorValidation!: ErrorValidation
  constructor(){}
}
