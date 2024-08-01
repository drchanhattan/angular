import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GameTextService } from './game-text-service';

@Component({
  selector: 'app-game-text',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './game-text.component.html',
})
export class GameTextComponent {
  @HostBinding('class') hostClasses = 'absolute flex flex-col items-center justify-center text-game-white font-inter';

  constructor(public textService: GameTextService) {}
}
