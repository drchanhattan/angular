import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable, of, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, FooterComponent, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  @HostBinding('class') hostClasses = 'flex flex-col items-center justify-center bg-mat-yellow text-mat-black';
  hero$: Observable<SafeUrl | null> = of(null);

  techStack = [
    { icon: 'angular', label: 'Angular' },
    { icon: 'typescript', label: 'Typescript' },
    { icon: 'html', label: 'HTML' },
    { icon: 'sass', label: 'SCSS' },
    { icon: 'javascript', label: 'Javascript' },
    { icon: 'tailwind', label: 'Tailwind' },
    { icon: 'material', label: 'Material' },
    { icon: 'git', label: 'Git' },
    { icon: 'rxjs', label: 'RXJS' },
    { icon: 'storybook', label: 'Storybook' },
    { icon: 'npm', label: 'NPM' },
    { icon: 'vs-code', label: 'Visual Studio' },
    { icon: 'webstorm', label: 'Webstorm' },
    { icon: 'jira', label: 'Jira' },
    { icon: 'teams', label: 'Teams' },
    { icon: 'slack', label: 'Slack' },
    { icon: 'c-sharp', label: 'C#' },
    { icon: 'selenium', label: 'Selenium' },
  ];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.fetchHero();
  }

  fetchHero() {
    this.hero$ = httpBlob$('photos/heroes/hero-home.jpg', this.http).pipe(
      take(1),
      map((blob) => sanitizeBlob(blob, this.sanitizer)),
    );
  }
}
