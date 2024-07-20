import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard/scoreboard-service';
import { GameService } from '../services/game-service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center text-primary';

  constructor(
    private router: Router,
    public gameService: GameService,
    public scoreboardService: ScoreboardService,
  ) {}

  exit() {
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
