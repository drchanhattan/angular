import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-game-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  text = input<string>('');
}
