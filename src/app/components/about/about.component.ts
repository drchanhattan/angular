import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../utils/blob-handler';
import { IconDirective } from '../../utils/icon/icon.directive';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, FooterComponent, IconDirective, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  host: { '[class]': 'hostClasses()' },
})
export class AboutComponent {
  protected hostClasses = computed(() => [
    // Layout
    'flex',
    'flex-col',
    'items-center',
    'justify-center',

    // Background
    'bg-mat-yellow',

    // Text
    'text-mat-black',
  ]);

  hero = toSignal(
    httpBlob$('photos/heroes/hero-home.jpg', this.http).pipe(map((blob) => sanitizeBlob(blob, this.sanitizer))),
    { initialValue: null },
  );

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
  ) {}
}
