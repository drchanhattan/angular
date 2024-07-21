import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() menu: MatMenuPanel<any> | null = null;
  @Output() click = new EventEmitter();
}
