import { Component, HostBinding } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [AvoidTheCobComponent],
  templateUrl: './game.component.html',
})
export class GameComponent {
  @HostBinding('class') hostClasses = 'flex h-dvh';
}
