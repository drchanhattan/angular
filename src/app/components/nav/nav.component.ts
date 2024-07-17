import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @HostBinding('class') hostClasses = 'justify-left flex flex-col items-start';
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

  constructor(private router: Router) {}

  navigate(path: string) {
    this.navigated.emit();

    this.router.navigate([path]).then(() => {
      window.location.reload();
    });
  }
}
