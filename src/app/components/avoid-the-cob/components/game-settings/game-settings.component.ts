import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { AudioService } from '../../services/audio.service';
import { CheatService } from '../../services/cheat.service';
import { CursorService } from '../../services/cursor.service';
import { ParticleService } from '../../services/particle.service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { PlayerNameService } from '../player-name/player-name.service';
import { GameSettingsService } from './game-settings.service';

@Component({
  selector: 'app-game-settings',
  imports: [GameButtonComponent, MatSliderModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './game-settings.component.html',
})
export class GameSettingsComponent {
  @HostBinding('class') hostClasses = [
    // Layout
    'absolute',
    'flex',
    'size-full',
    'flex-col',
    'items-center',
    'justify-center',
  ].join(' ');

  constructor(
    public audioService: AudioService,
    public cheatService: CheatService,
    public cursorService: CursorService,
    public gameSettingsService: GameSettingsService,
    public particleService: ParticleService,
    public nameService: PlayerNameService,
  ) {}

  reset() {
    this.audioService.reset();
    this.cheatService.cheats.reset();
    this.cursorService.donut.reset();
    this.particleService.maxCount.reset(this.particleService.default);
  }
}
