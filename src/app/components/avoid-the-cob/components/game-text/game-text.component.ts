import { Component, HostBinding } from '@angular/core';
import { GameTextService } from './game-text.service';

@Component({
  selector: 'app-game-text',
  standalone: true,
  templateUrl: './game-text.component.html',
})
export class GameTextComponent {
  @HostBinding('class') hostClasses = [
    // Layout
    'absolute',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',

    // Font
    'font-inter',
    'text-mat-cream',
  ].join(' ');

  constructor(public textService: GameTextService) {}
}
