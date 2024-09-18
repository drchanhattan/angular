import { Component, HostBinding, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { GameHelpService } from '../game-help/game-help-service';
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
    'absolute flex size-full flex-col items-center justify-center lg:flex-row [&>button>mat-icon]:!text-mat-yellow';
  @Input() corn?: SafeUrl | null;
  @Input() title?: SafeUrl | null;

  constructor(
    public avoidTheCob: AvoidTheCobService,
    public gameHelpService: GameHelpService,
    public gameSettingsService: GameSettingsService,
    public leaderboardService: LeaderboardService,
    public router: Router,
  ) {}
}
