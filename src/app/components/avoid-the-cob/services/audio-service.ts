import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  play(src: string, loop = false) {
    let audio = new Audio();
    audio.src = src;
    audio.play();

    if (loop) {
      audio.loop = true;
    } else {
      audio.addEventListener('ended', () => {
        audio.removeEventListener('ended', () => {});
        (audio as any) = null;
      });
    }
  }
}
