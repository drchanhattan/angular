import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from './icon';

@Component({
    selector: 'app-icon',
    imports: [CommonModule, MatIconModule],
    templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input() icon: Icon = { matIcon: 'face' };
  @Input() classes: string[] = [];
}
