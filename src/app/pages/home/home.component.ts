import { Component, HostBinding } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, FooterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @HostBinding('class') hostClasses = 'flex flex-col overflow-hidden';
}
