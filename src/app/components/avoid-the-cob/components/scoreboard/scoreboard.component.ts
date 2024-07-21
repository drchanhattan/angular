import { Component, HostBinding } from '@angular/core';
import { GameService } from '../../services/game-service';
import { GameMenuButtonComponent } from '../game-menu-button/game-menu-button.component';
import { ScoreboardService } from './scoreboard-service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [GameMenuButtonComponent],
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent {
  @HostBinding('class') hostClasses = 'absolute flex h-full w-full flex-col items-center bg-game-black font-ink';

  constructor(
    public gameService: GameService,
    public scoreboardService: ScoreboardService,
  ) {}
}
