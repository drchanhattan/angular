import { Component } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeSelectorService } from './theme-selector-service';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  constructor(public service: ThemeSelectorService) {}

  setTheme(theme: 'light-theme' | 'dark-theme') {
    this.service.setTheme(theme);
  }
}
