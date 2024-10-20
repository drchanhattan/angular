import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { AssetService } from '../../services/asset.service';
import { AvoidTheCobService } from '../../services/avoid-the-cob.service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { MainMenuService } from '../main-menu/main-menu.service';
import { PlayerNameService } from './player-name.service';

@Component({
  selector: 'app-player-name',
  standalone: true,
  imports: [GameButtonComponent, ReactiveFormsModule],
  templateUrl: './player-name.component.html',
})
export class PlayerNameComponent {
  @HostBinding('class') hostClasses =
    'absolute flex h-full w-4/5 flex-col items-center justify-center sm:w-1/2 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-4/12';
  pea: SafeUrl = this.assetService.images$.value[1];

  constructor(
    public assetService: AssetService,
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
      this.avoidTheCob.play(false);
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enterName();
    }
  }
}
