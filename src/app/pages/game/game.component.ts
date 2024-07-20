import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, AvoidTheCobComponent],
  templateUrl: './game.component.html',
})
export class GameComponent {
  @HostBinding('class') hostClasses = 'flex w-[100vw] h-[100vh]';

  @HostListener('window:resize', ['$event'])
  onResize() {
    location.reload();
  }
}
