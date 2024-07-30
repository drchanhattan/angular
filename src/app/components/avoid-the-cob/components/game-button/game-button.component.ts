import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @HostBinding('class') hostClasses = 'm-10';

  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter();
}
