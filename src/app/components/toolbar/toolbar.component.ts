import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, ThemeSelectorComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @HostBinding('class') hostClasses =
    'toolbar-neutral mat-elevation-z10 !fixed left-0 top-0 z-10 flex h-14 w-full items-center justify-between px-4';
  @Input() drawer!: MatDrawer;
}
