import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audioEnabled = new FormControl<boolean>(false);

  constructor() {
    const audio = localStorage.getItem('audio');

    if (audio) {
      this.audioEnabled.setValue(JSON.parse(audio));
    }

    this.audioEnabled.valueChanges.subscribe((change) => {
      localStorage.setItem('audio', JSON.stringify(change));
    });
  }

  play(src: string, loop = false) {
    if (this.audioEnabled.value) {
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
