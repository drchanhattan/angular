import { Component, HostBinding } from '@angular/core';
import { GameService } from '../../services/game-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { ScoreboardService } from './scoreboard-service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [GameButtonComponent],
  templateUrl: './scoreboard.component.html',
})
export class ScoreboardComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center font-ink';

  constructor(
    public gameService: GameService,
    public scoreboardService: ScoreboardService,
  ) {}
}
