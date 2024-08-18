import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './game-button.component.html',
})
export class GameButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() small: boolean = false;
}
