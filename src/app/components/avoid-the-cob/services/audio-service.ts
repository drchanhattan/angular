import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

export enum AudioFile {
  Corn = 'corn.mp3',
  Heart = 'heart.mp3',
  LevelUp = 'levelup.mp3',
  Pea = 'pea.mp3',
  PowerUp = 'powerup.mp3',
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  enabled = new FormControl<boolean>(true);
  private audioCache: Map<AudioFile, string> = new Map();

  constructor(private http: HttpClient) {
    const audio = localStorage.getItem('audio');

    if (audio) {
      this.enabled.setValue(JSON.parse(audio));
    }

    this.enabled.valueChanges.subscribe((change) => {
      localStorage.setItem('audio', JSON.stringify(change));
    });

    Object.values(AudioFile).forEach((file) => this.preloadAudio(file));
  }

  play(src: AudioFile, loop = false) {
    if (this.enabled.value) {
      const audioUrl = this.audioCache.get(src);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.loop = loop;
        audio.play();
      }
    }
  }

  private preloadAudio(audio: AudioFile) {
    this.http
      .get(audio, { responseType: 'blob' })
      .subscribe((blob) => this.audioCache.set(audio, URL.createObjectURL(blob)));
  }
}
