import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  links = [
    { url: '', label: 'Home' },
    // { url: '/asia', label: 'Asia' },
    // { url: '/europe', label: 'Europe' },
    // { url: '/oceania', label: 'Oceania' },
    // { url: '/north-america', label: 'North America' },
    // { url: '/south-america', label: 'South America' },
    { url: '/game', label: 'Game' },
  ];
}
