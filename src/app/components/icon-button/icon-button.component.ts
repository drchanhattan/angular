import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Icon } from '../icon/icon';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-icon-button',
  imports: [CommonModule, IconComponent, MatButtonModule],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @HostBinding('class') hostClasses = 'scale-150';
  @Input() icon: Icon = { matIcon: 'face' };
  @Input() classes: string = '';
  @Input() yellow: boolean = false;
}
