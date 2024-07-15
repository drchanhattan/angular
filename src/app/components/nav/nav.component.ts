import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @Output() navigated = new EventEmitter();

  links = [
    { url: '', label: 'Home' },
    { url: '/asia', label: 'Asia' },
    { url: '/europe', label: 'Europe' },
    { url: '/oceania', label: 'Oceania' },
    { url: '/north-america', label: 'North America' },
    { url: '/south-america', label: 'South America' },
    { url: '/game', label: 'Game' },
  ];
}
