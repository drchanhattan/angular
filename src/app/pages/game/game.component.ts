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
  @HostBinding('class') hostClasses = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    const activeElement = document.activeElement as HTMLElement;
    if (!(activeElement instanceof HTMLInputElement)) {
      location.reload();
    }
  }
}
