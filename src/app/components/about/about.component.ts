import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './about.component.html',
  animations: [
    trigger('opacityAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('1000ms {{ delay }}ms', style({ opacity: 1 }))], {
        params: { delay: 0 },
      }),
    ]),
  ],
})
export class AboutComponent {
  @HostBinding('class') hostClasses = 'flex h-fit min-h-screen w-full justify-center text-mat-cream';
}
