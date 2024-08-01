import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { GameSettingsService } from '../game-settings/game-settings-service';
import { LeaderboardService } from '../leaderboard/leaderboard-service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [GameButtonComponent, IconButtonComponent],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  @HostBinding('class') hostClasses =
    'absolute flex flex-col size-full items-center justify-center [&>button>mat-icon]:!text-game-yellow';

  constructor(
    public avoidTheCob: AvoidTheCobService,
    public gameSettingsService: GameSettingsService,
    public leaderboardService: LeaderboardService,
    private router: Router,
  ) {}

  exit() {
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
