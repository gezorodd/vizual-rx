import {Component, HostBinding, Input} from '@angular/core';
import {AlertType} from "./alert-message.model";

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss'
})
export class AlertMessageComponent {
  @Input({required: true}) type!: AlertType;

  @HostBinding('class')
  get typeClass(): string {
    return `type-` + this.type;
  }
}
