import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @HostBinding('class') hostClasses = 'my-10';
  @Input() text: string = '';
  @Input() disabled: boolean = false;
}
