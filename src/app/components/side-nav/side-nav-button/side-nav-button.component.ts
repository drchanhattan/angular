import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideNavGroup } from '../side-nav-links';

@Component({
  selector: 'app-side-nav-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './side-nav-button.component.html',
})
export class SideNavButtonComponent {
  @Input() active?: boolean;
  @Input() label?: string;
  @Input() group?: SideNavGroup;

  expandGroup(button: any) {
    if (!!this.group) {
      this.group.expanded = !this.group.expanded;
      button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
