import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-home',
  imports: [AboutComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @HostBinding('class') hostClasses = [
    // Layout
    'flex',
    'flex-col',
    'overflow-hidden',
  ].join(' ');
}
