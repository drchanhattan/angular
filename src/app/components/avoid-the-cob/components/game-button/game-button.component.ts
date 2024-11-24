import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-button',
  imports: [MatButtonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @Input() text: string = '';
  @Input() small: boolean = false;
}
