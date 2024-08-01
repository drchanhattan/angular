import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { NewPlayerService } from './new-player-service';

@Component({
  selector: 'app-new-player',
  standalone: true,
  imports: [CommonModule, GameButtonComponent, ReactiveFormsModule],
  templateUrl: './new-player.component.html',
})
export class NewPlayerComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center';
  @Output() backClicked = new EventEmitter();
  @Output() nameEntered = new EventEmitter();

  constructor(
    private avoidTheCob: AvoidTheCobService,
    private mainMenuService: MainMenuService,
    public newPlayerService: NewPlayerService,
  ) {}

  back() {
    this.newPlayerService.hide();
    this.mainMenuService.show();
  }

  enterName() {
    const name = this.newPlayerService.name;

    if (name.value && name.valid) {
      window.localStorage.setItem('name', name.value.toUpperCase());
      this.avoidTheCob.play();
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
