import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {

  @Input() isInvalid = false
  @Input() message = "";

}
