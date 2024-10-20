import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, take } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../../utils/blob-handler';
import { GameAudio } from '../models/game-audio/game-audio';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  audio$ = new BehaviorSubject<Map<GameAudio, string>>(new Map());
  images$ = new BehaviorSubject<SafeUrl[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.preloadAssets();
  }

  preloadAssets() {
    combineLatest([this.preloadAudio$(), this.preloadImages$()])
      .pipe(take(1))
      .subscribe(([audio, images]) => {
        this.audio$.next(audio);
        this.images$.next(images);
        this.loading$.next(false);
      });
  }

  private preloadImages$(): Observable<SafeUrl[]> {
    const imageBlobs$ = ['corn.svg', 'pea.svg', 'title.svg'].map((url) => httpBlob$(url, this.http));
    return forkJoin(imageBlobs$).pipe(map((images) => images.map((i) => sanitizeBlob(i, this.sanitizer))));
  }

  private preloadAudio$(): Observable<Map<GameAudio, string>> {
    return forkJoin(
      Object.values(GameAudio).map((audio) =>
        httpBlob$(audio, this.http).pipe(map((blob) => [audio, URL.createObjectURL(blob)] as [GameAudio, string])),
      ),
    ).pipe(map((data) => new Map(data)));
  }
}
