import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './game-menu-button.component.html',
})
export class GameMenuButtonComponent {
  @HostBinding('class') hostClasses = 'absolute';

  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter();
}
