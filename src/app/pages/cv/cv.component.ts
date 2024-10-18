import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [],
  templateUrl: './cv.component.html',
})
export class CVComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.http
      .get('cv.pdf', { responseType: 'blob' })
      .pipe(take(1))
      .subscribe((file) => {
        const url = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Chris Chan CV.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
        this.router.navigate(['/']);
      });
  }
}
