import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import { IconDirective } from '../../utils/icon/icon.directive';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  imports: [NgClass, IconDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  private readonly scrollTop = signal(window.scrollY < 64);

  protected readonly darkToolbar = computed(
    () => !this.scrollTop() || this.toolbarService.navOpen() || this.toolbarService.photoNavOpen(),
  );

  @HostListener('window:scroll', [])
  protected onScroll() {
    this.scrollTop.set(window.scrollY < 64);
  }

  constructor(public toolbarService: ToolbarService) {}
}
