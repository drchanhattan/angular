import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { AudioService } from '../../services/audio-service';
import { CheatService } from '../../services/cheat-service';
import { ParticleService } from '../../services/particle-service';
import { GameButtonComponent } from '../game-button/game-button.component';
import { NewPlayerService } from '../new-player/new-player-service';
import { GameSettingsService } from './game-settings-service';

@Component({
  selector: 'app-game-settings',
  standalone: true,
  imports: [
    CommonModule,
    GameButtonComponent,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './game-settings.component.html',
})
export class GameSettingsComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center';

  constructor(
    public audioService: AudioService,
    public cheatService: CheatService,
    public gameSettingsService: GameSettingsService,
    public particleService: ParticleService,
    public newPlayerService: NewPlayerService,
  ) {}

  reset() {
    this.audioService.audioEnabled.reset(true);
    this.cheatService.cheats.reset();
    this.particleService.max.reset(2000);
    this.newPlayerService.reset();
  }
}
