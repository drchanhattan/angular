import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { ToolbarService } from './toolbar-service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, ThemeSelectorComponent],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer;

  constructor(public toolbarService: ToolbarService) {}
}
