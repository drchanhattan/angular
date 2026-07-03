import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { GameTextService } from './game-text.service';

@Component({
  selector: 'app-game-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-text.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class GameTextComponent {
  protected readonly hostClasses = computed(() => [
    // Layout
    'absolute',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',

    // Font
    'font-inter',
    'text-mat-cream',
  ]);

  constructor(protected textService: GameTextService) {}
}
