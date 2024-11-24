import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ToolbarService } from './toolbar.service';

@Component({
    selector: 'app-toolbar',
    imports: [CommonModule, IconButtonComponent, MatButtonModule, MatIconModule],
    templateUrl: './toolbar.component.html'
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
    return !this.scrollTop || this.toolbarService.menu?.opened || this.toolbarService.photoMenu?.opened;
  }
}
