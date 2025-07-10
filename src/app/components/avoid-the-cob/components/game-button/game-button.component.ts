import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-button',
  imports: [MatButtonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  text = input<string>('');
  small = input<boolean>(false);
}
