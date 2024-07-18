import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';

interface Link {
  label: string;
  url: string;
}

interface Links {
  label: string;
  url: string;
  sublinks?: Link[];
  expanded?: boolean;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeSelectorComponent, MatIconModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @HostBinding('class') hostClasses = 'h-full flex flex-col items-center';
  @Output() toggleDrawer = new EventEmitter();

  currentRoute!: string;

  links: Links[] = [
    { label: 'Home', url: '/' },
    {
      label: 'Gallery',
      url: '',
      sublinks: [
        { label: 'Europe', url: '/europe' },
        { label: 'Asia', url: '/asia' },
        { label: 'North America', url: '/north-america' },
        { label: 'South America', url: '/south-america' },
        { label: 'Oceania', url: '/oceania' },
      ],
      expanded: true,
    },
    { label: 'Games', url: '', sublinks: [{ label: 'Avoid the Cob 2', url: '/game' }], expanded: true },
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
    this.toggleDrawer.emit();

    this.router.navigate([path]).then(() => {
      window.location.reload();
    });
  }

  hasActiveSublink(links: Link[]) {
    return links.map((link) => link.url).includes(this.currentRoute);
  }
}
