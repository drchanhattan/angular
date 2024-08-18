import { Component, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AvoidTheCobService } from '../../services/avoid-the-cob-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu-service';
import { ModeSelectorService } from './mode-selector-service';

@Component({
  selector: 'app-mode-selector',
  standalone: true,
  imports: [GameButtonComponent, MatButtonModule],
  templateUrl: './mode-selector.component.html',
})
export class ModeSelectorComponent {
  @HostBinding('class') hostClasses = 'absolute size-full flex flex-col items-center justify-center';

  constructor(
    private avoidTheCob: AvoidTheCobService,
    private mainMenuService: MainMenuService,
    private modeSelectorService: ModeSelectorService,
  ) {}

  selectMode(mobMode: boolean) {
    this.modeSelectorService.hide();
    this.avoidTheCob.newGame(mobMode);
  }

  back() {
    this.modeSelectorService.hide();
    this.mainMenuService.show();
  }
}
