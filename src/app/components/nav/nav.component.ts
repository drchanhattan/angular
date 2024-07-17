import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center';
  @Output() navigated = new EventEmitter();

  currentRoute!: string;

  links = [
    { url: '', label: 'Home' },
    { url: '/europe', label: 'Europe' },
    { url: '/asia', label: 'Asia' },
    { url: '/north-america', label: 'North America' },
    { url: '/south-america', label: 'South America' },
    { url: '/oceania', label: 'Oceania' },
    { url: '/game', label: 'Avoid the Cob 2' },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        window.scrollTo(0, 0);
      }
    });
  }

  navigate(path: string) {
    this.navigated.emit();

    this.router.navigate([path]).then(() => {
      window.location.reload();
    });
  }
}
