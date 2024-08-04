import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SvgLoaderService {
  corn$ = new BehaviorSubject<SafeUrl | null>(null);
  pea$ = new BehaviorSubject<SafeUrl | null>(null);
  title$ = new BehaviorSubject<SafeUrl | null>(null);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.preloadImage('corn.svg', this.corn$);
    this.preloadImage('pea.svg', this.pea$);
    this.preloadImage('title.svg', this.title$);
  }

  private preloadImage(svg: string, safeUrl: BehaviorSubject<SafeUrl | null>) {
    this.http
      .get(svg, { responseType: 'blob' })
      .subscribe((blob) => safeUrl.next(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))));
  }
}
