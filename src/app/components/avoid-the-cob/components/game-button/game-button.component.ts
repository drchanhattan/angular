import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter();
}
