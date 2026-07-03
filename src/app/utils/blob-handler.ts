import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export function httpBlob$(url: string, http: HttpClient): Observable<Blob> {
  return http.get(url, { responseType: 'blob' });
}

export function sanitizeBlob(blob: Blob, sanitizer: DomSanitizer): SafeUrl {
  return sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
}
