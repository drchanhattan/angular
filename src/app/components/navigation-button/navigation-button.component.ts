import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from '../icon/icon';
import { IconComponent } from '../icon/icon.component';
import { SideNavGroup, SideNavLink } from '../navigation/navigation-links';

@Component({
  selector: 'app-navigation-button',
  imports: [CommonModule, IconComponent, MatButtonModule, MatIconModule],
  templateUrl: './navigation-button.component.html',
})
export class NavigationButtonComponent {
  @Input() active?: boolean;
  @Input() icon?: Icon;
  @Input() link?: SideNavLink;
  @Input() group?: SideNavGroup;

  iconClasses = 'mr-3 !flex !items-center !justify-center !overflow-visible !text-2xl';

  expandGroup(button: any) {
    if (!!this.group) {
      this.group.expanded = !this.group.expanded;
      button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
