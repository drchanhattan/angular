import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameButtonComponent } from '../game-button/game-button.component';
import { GameSettingsService } from './game-settings-service';

@Component({
  selector: 'app-game-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, GameButtonComponent],
  templateUrl: './game-settings.component.html',
})
export class GameSettingsComponent {
  @HostBinding('class') hostClasses = 'absolute flex size-full flex-col items-center justify-center font-ink';

  constructor(public gameSettingsService: GameSettingsService) {}
}
