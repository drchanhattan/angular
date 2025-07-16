import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from './icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @HostBinding('class') hostClasses = 'flex';

  icon = input.required<Icon>();
  classes = input<string[]>([]);
}
