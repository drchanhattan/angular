import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { AvoidTheCobService } from '../../avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { LeaderboardService } from '../leaderboard/leaderboard-service';
import { MainMenuService } from './main-menu-service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [GameButtonComponent, IconButtonComponent],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  @HostBinding('class') hostClasses = 'absolute flex flex-col size-full flex items-center justify-center';

  constructor(
    private router: Router,
    public gameService: AvoidTheCobService,
    public mainMenuService: MainMenuService,
    public leaderboardService: LeaderboardService,
  ) {}

  showLeaderboard() {
    this.mainMenuService.hide();
    this.leaderboardService.show();
  }

  exit() {
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
