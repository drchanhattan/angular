import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [],
})
export class HomeComponent {
  @HostBinding('class') hostClasses = '!size-full';
}
