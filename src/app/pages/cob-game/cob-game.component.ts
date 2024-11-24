import { Component, HostBinding } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';

@Component({
    selector: 'app-cob-game',
    imports: [AvoidTheCobComponent],
    templateUrl: './cob-game.component.html'
})
export class CobGameComponent {
  @HostBinding('class') hostClasses = 'flex h-dvh';
}
