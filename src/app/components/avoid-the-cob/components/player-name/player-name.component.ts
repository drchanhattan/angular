import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game-service';
import { GameMenuButtonComponent } from '../game-menu-button/game-menu-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { PlayerNameService } from './player-name-service';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [CommonModule, GameMenuButtonComponent, ReactiveFormsModule],
  templateUrl: './player-name.component.html',
})
export class PlayerNameComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center';
  @Output() backClicked = new EventEmitter();
  @Output() nameEntered = new EventEmitter();

  constructor(
    private gameService: GameService,
    private mainMenuService: MainMenuService,
    public playerNameService: PlayerNameService,
  ) {}

  back() {
    this.playerNameService.hide();
    this.mainMenuService.show();
  }

  enterName() {
    this.playerNameService.saveName();
    this.gameService.play();
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
