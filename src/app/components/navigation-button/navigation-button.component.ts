import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
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
  active = input.required<boolean>();
  icon = input<Icon>();
  link = input<SideNavLink>();
  group = input<SideNavGroup>();

  iconClasses = 'mr-3 !flex !items-center !justify-center !overflow-visible !text-2xl';

  expandGroup(button: MatButton) {
    const group = this.group();
    if (!!group) {
      group.expanded = !group.expanded;
      button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
