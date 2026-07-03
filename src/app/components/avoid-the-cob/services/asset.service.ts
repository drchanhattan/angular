import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { combineLatest, forkJoin, map, Observable, shareReplay } from 'rxjs';
import { httpBlob$, sanitizeBlob } from '../../../utils/blob-handler';
import { GameAudio } from '../models/game-audio/game-audio';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  private assets$ = combineLatest([this.preloadAudio$(), this.preloadImages$()]).pipe(shareReplay(1));

  audio = toSignal(this.assets$.pipe(map(([audio]) => audio)), { initialValue: new Map<GameAudio, string>() });
  images = toSignal(this.assets$.pipe(map(([, images]) => images)), { initialValue: [] as SafeUrl[] });
  loading = toSignal(this.assets$.pipe(map(() => false)), { initialValue: true });

  private preloadImages$(): Observable<SafeUrl[]> {
    const imageBlobs$ = ['game/corn.svg', 'game/pea.svg', 'game/title.svg'].map((url) => httpBlob$(url, this.http));
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
