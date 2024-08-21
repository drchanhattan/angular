import { Component, HostBinding } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';
import { DeviceService } from '../../components/avoid-the-cob/services/device-service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [AvoidTheCobComponent],
  templateUrl: './game.component.html',
})
export class GameComponent {
  @HostBinding('class') hostClasses = 'flex h-dvh';

  constructor(private deviceService: DeviceService) {
    if (this.deviceService.isTouch) {
      document.querySelector('body')?.requestFullscreen();
    }
  }
}
