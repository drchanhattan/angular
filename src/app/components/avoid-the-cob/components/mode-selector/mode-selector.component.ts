import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { ModeSelectorService } from './mode-selector-service';

@Component({
  selector: 'app-mode-selector',
  standalone: true,
  imports: [CommonModule, GameButtonComponent, ReactiveFormsModule],
  templateUrl: './mode-selector.component.html',
})
export class ModeSelectorComponent {
  @HostBinding('class') hostClasses = 'absolute size-full flex flex-col items-center justify-center';

  constructor(
    private avoidTheCob: AvoidTheCobService,
    private mainMenuService: MainMenuService,
    private modeSelectorService: ModeSelectorService,
  ) {}

  selectMode(mob: boolean) {
    this.modeSelectorService.hide();
    this.avoidTheCob.newGame(mob);
  }

  back() {
    this.modeSelectorService.hide();
    this.mainMenuService.show();
  }
}
