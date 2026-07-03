import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-cob-game',
  imports: [AvoidTheCobComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cob-game.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class CobGameComponent {
  protected readonly hostClasses = computed(() => [
    // Layout
    'flex',
    'h-dvh',
  ]);
}
