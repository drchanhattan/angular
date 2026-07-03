import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { IconDirective } from '../../utils/icon/icon.directive';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, IconDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  scrollTop: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollTop = window.scrollY < 64;
  }

  constructor(public toolbarService: ToolbarService) {
    this.onScroll();
  }

  get darkToolbar() {
    return !this.scrollTop || this.toolbarService.nav?.opened || this.toolbarService.photoNav?.opened;
  }
}
