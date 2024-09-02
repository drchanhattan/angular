import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideNavGroup, SideNavLink } from '../navigation-links';

@Component({
  selector: 'app-navigation-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation-button.component.html',
})
export class NavigationButtonComponent {
  @Input() active?: boolean;
  @Input() link?: SideNavLink;
  @Input() group?: SideNavGroup;

  expandGroup(button: any) {
    if (!!this.group) {
      this.group.expanded = !this.group.expanded;
      button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
