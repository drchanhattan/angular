import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() menu: MatMenuPanel<any> | null = null;
  @Input() color: string = '!text-primary';
}
