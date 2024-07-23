import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../../icon-button/icon-button.component';
import { GameService } from '../../services/game-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { ScoreboardService } from '../scoreboard/scoreboard-service';
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
    public gameService: GameService,
    public mainMenuService: MainMenuService,
    public scoreboardService: ScoreboardService,
  ) {}

  exit() {
    this.router.navigate(['/home']).then(() => window.location.reload());
  }
}
