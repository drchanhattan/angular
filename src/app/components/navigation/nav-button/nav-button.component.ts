import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconDirective } from '../../../utils/icon/icon.directive';
import { NavGroup, NavLink } from '../nav/links';

@Component({
  selector: 'app-nav-button',
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-button.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class NavButtonComponent {
  public readonly active = input.required<boolean>();
  public readonly icon = input<string>();
  public readonly link = input<NavLink>();
  public readonly group = input<NavGroup>();

  protected readonly hostClasses = computed(() => [
    // Radius
    'rounded-lg',

    // Hover
    'hover:bg-mat-white/10',
  ]);

  protected readonly textColor = computed(() => (this.active() ? '!text-mat-yellow' : '!text-mat-cream'));

  protected readonly iconClasses = computed(() => [
    this.textColor(),
    'size-10',
    'mr-1',
    'flex',
    'items-center',
    'justify-center',
    'overflow-visible',
    'text-2xl',
  ]);

  protected readonly labelClasses = computed(() => [this.textColor(), 'text-lg', 'text-nowrap', 'font-medium']);

  protected expandGroup(button: HTMLElement) {
    const group = this.group();
    if (!!group) {
      group.expanded = !group.expanded;
      button.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
