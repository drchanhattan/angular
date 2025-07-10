import { CommonModule } from '@angular/common';
import { Component, HostBinding, input } from '@angular/core';
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

  icon = input<Icon>({ matIcon: 'face' });
  classes = input<string>('');
  yellow = input<boolean>(false);
}
