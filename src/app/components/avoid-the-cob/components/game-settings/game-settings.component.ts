import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-settings.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class GameSettingsComponent {
  protected readonly hostClasses = computed(() => [
    // Layout
    'absolute',
    'flex',
    'size-full',
    'flex-col',
    'items-center',
    'justify-center',
  ]);

  protected readonly audioService = inject(AudioService);
  protected readonly cheatService = inject(CheatService);
  protected readonly cursorService = inject(CursorService);
  protected readonly gameSettingsService = inject(GameSettingsService);
  protected readonly particleService = inject(ParticleService);
  protected readonly nameService = inject(PlayerNameService);

  protected readonly particleCount = toSignal(this.particleService.maxCount.valueChanges, {
    initialValue: this.particleService.maxCount.value ?? this.particleService.default,
  });
  protected readonly donut = toSignal(this.cursorService.donut.valueChanges, {
    initialValue: this.cursorService.donut.value ?? false,
  });
  protected readonly playerName = toSignal(this.nameService.name.valueChanges, {
    initialValue: this.nameService.name.value ?? '',
  });
  protected readonly cheatsEnabled = toSignal(this.cheatService.cheats.valueChanges.pipe(), {
    initialValue: this.cheatService.cheats.value,
  });

  protected readonly settingsChanged = computed(
    () =>
      this.audioService.changed() ||
      Object.values(this.cheatsEnabled()).some((v) => !!v) ||
      this.particleCount() !== this.particleService.default ||
      !!this.donut(),
  );

  protected reset() {
    this.audioService.reset();
    this.cheatService.cheats.reset();
    this.cursorService.donut.reset();
    this.particleService.maxCount.reset(this.particleService.default);
  }
}
