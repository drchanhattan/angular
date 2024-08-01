import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [AvoidTheCobComponent, CommonModule],
  templateUrl: './game.component.html',
})
export class GameComponent {}
