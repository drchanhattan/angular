import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-home',
  imports: [AboutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class HomeComponent {
  protected hostClasses = computed(() => [
    // Layout
    'flex',
    'flex-col',
    'overflow-hidden',
  ]);
}
