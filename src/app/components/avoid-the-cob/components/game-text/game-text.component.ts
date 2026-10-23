import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GameTextStore } from './game-text.store';

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

  protected readonly textStore = inject(GameTextStore);
}
