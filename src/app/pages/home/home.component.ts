import { Component, HostBinding } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';

@Component({
    selector: 'app-home',
    imports: [AboutComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent {
  @HostBinding('class') hostClasses = 'flex flex-col overflow-hidden';
}
