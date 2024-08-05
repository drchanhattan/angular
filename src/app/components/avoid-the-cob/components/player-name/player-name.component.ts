import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { PlayerNameService } from './player-name-service';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [CommonModule, GameButtonComponent, ReactiveFormsModule],
  templateUrl: './player-name.component.html',
})
export class PlayerNameComponent {
  @HostBinding('class') hostClasses =
    'absolute flex h-full w-4/5 flex-col items-center justify-center sm:w-1/2 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-4/12';
  @Input() pea?: SafeUrl | null;

  constructor(
    private avoidTheCob: AvoidTheCobService,
    private mainMenuService: MainMenuService,
    public playerNameService: PlayerNameService,
  ) {}

  back() {
    this.playerNameService.name.setValue('');
    this.playerNameService.hide();
    this.mainMenuService.show();
  }

  enterName() {
    const name = this.playerNameService.name;

    if (name.value && name.valid) {
      localStorage.setItem('name', name.value.toUpperCase());
      this.avoidTheCob.selectMode();
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
