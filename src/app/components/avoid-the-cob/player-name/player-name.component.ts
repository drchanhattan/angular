import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainMenuService } from '../main-menu/main-menu-service';
import { GameService } from '../services/game-service';
import { PlayerNameService } from './player-name-service';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-name.component.html',
})
export class PlayerNameComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center';
  @Output() backClicked = new EventEmitter();
  @Output() nameEntered = new EventEmitter();

  constructor(
    private gameService: GameService,
    public playerNameService: PlayerNameService,
    private mainMenuService: MainMenuService,
  ) {}

  back() {
    this.gameService.hideNamePrompt();
    this.mainMenuService.show();
  }

  enterName() {
    this.playerNameService.saveName();
    this.gameService.play();
  }
}
