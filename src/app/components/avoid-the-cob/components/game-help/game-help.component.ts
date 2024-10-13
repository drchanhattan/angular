import { Component, HostBinding } from '@angular/core';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { GameButtonComponent } from '../game-button/game-button.component';
import { GameHelpObject } from './game-help-object';
import { GameHelpService } from './game-help.service';

@Component({
  selector: 'app-game-help',
  standalone: true,
  imports: [GameButtonComponent, IconButtonComponent],
  templateUrl: './game-help.component.html',
})
export class GameHelpComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center overflow-hidden';

  selectedIndex = 0;
  gameHelpObjects: GameHelpObject[] = [
    {
      gameObject: 'Pea',
      description:
        'Each pea awards 1 point multiplied by your current combo level. Your combo will increase for every pea collected in a row without taking damage.',
    },
    {
      gameObject: 'Corn',
      description:
        'Avoid these! Collisions will cost you a life and reset your combo. Tip: Excessive movement can backfire. Instead, try letting the corn do the work.',
    },
    {
      gameObject: 'Power Up',
      description:
        'Power ups are spawned every 3 levels and offer a random ability that will last an entire round. But be careful, they can be tricky to catch!',
    },
    {
      gameObject: 'Life',
      description:
        "Extra lives will help you stay in the game. Tip: They appear frequently, but be sure to collect them first, or you'll miss your chance!",
    },
  ];

  constructor(public gameHelpService: GameHelpService) {}

  forward() {
    this.selectedIndex + 1 < this.gameHelpObjects.length ? this.selectedIndex++ : (this.selectedIndex = 0);
  }

  backward() {
    this.selectedIndex > 0 ? this.selectedIndex-- : (this.selectedIndex = this.gameHelpObjects.length - 1);
  }
}
