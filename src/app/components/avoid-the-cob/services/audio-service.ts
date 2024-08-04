import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  enabled = new FormControl<boolean>(true);

  constructor() {
    const audio = localStorage.getItem('audio');

    if (audio) {
      this.enabled.setValue(JSON.parse(audio));
    }

    this.enabled.valueChanges.subscribe((change) => {
      localStorage.setItem('audio', JSON.stringify(change));
    });
  }

  play(src: string, loop = false) {
    if (this.enabled.value) {
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
}
