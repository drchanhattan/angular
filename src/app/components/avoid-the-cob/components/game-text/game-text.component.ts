import { Component, HostBinding } from '@angular/core';
import { GameTextService } from './game-text-service';

@Component({
  selector: 'app-game-text',
  standalone: true,
  templateUrl: './game-text.component.html',
})
export class GameTextComponent {
  @HostBinding('class') hostClasses = 'absolute flex flex-col items-center justify-center font-inter text-mat-cream';

  constructor(public textService: GameTextService) {}
}
