import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @HostBinding('class') hostClasses = 'my-10';
  @Input() text: string = '';
  @Input() disabled: boolean = false;
}
