import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-game-button',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  text = input<string>('');
}
