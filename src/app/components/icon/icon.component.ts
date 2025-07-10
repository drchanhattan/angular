import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from './icon';

@Component({
  selector: 'app-icon',
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  icon = input<Icon>({ matIcon: 'face' });
  classes = input<string[]>([]);
}
