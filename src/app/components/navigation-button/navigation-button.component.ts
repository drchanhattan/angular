import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
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

  textColor = computed(() => (this.active() ? '!text-mat-yellow' : '!text-mat-cream'));

  iconClasses = computed(() => [
    this.textColor(),
    'mr-3',
    '!flex',
    '!items-center',
    '!justify-center',
    '!overflow-visible',
    '!text-2xl',
  ]);

  labelClasses = computed(() => [this.textColor(), 'text-lg', 'text-nowrap']);

  expandGroup(button: MatButton) {
    const group = this.group();
    if (!!group) {
      group.expanded = !group.expanded;
      button._elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
