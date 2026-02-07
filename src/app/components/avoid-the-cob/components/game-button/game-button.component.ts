import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  text = input<string>('');
}
