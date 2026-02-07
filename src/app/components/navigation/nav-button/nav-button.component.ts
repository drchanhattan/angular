import { CommonModule } from '@angular/common';
import { Component, computed, HostBinding, input } from '@angular/core';
import { IconDirective } from '../../../utils/icon/icon.directive';
import { NavGroup, NavLink } from '../nav/links';

@Component({
  selector: 'app-nav-button',
  imports: [CommonModule, IconDirective],
  templateUrl: './nav-button.component.html',
})
export class NavButtonComponent {
  active = input.required<boolean>();
  icon = input<string>();
  link = input<NavLink>();
  group = input<NavGroup>();

  @HostBinding('class') hostClasses = [
    // Radius
    'rounded-lg',

    // Hover
    'hover:bg-mat-white/10',
  ].join(' ');

  textColor = computed(() => (this.active() ? '!text-mat-yellow' : '!text-mat-cream'));

  iconClasses = computed(() => [
    this.textColor(),
    'size-10',
    'mr-1',
    'flex',
    'items-center',
    'justify-center',
    'overflow-visible',
    'text-2xl',
  ]);

  labelClasses = computed(() => [this.textColor(), 'text-lg', 'text-nowrap', 'font-medium']);

  expandGroup(button: HTMLElement) {
    const group = this.group();
    if (!!group) {
      group.expanded = !group.expanded;
      button.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
