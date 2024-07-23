import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { GameService } from '../../services/game-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { PlayerNameInputComponent } from './player-name-input/player-name-input.component';
import { PlayerNameService } from './player-name-service';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [CommonModule, GameButtonComponent, PlayerNameInputComponent],
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
    const firstName = this.playerNameService.firstName;
    const lastName = this.playerNameService.lastName;

    if (firstName.value && firstName.valid && lastName.value && lastName.valid) {
      window.localStorage.setItem('firstName', firstName.value.toUpperCase());
      window.localStorage.setItem('lastName', lastName.value.toUpperCase());
      this.gameService.play();
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
