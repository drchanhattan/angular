import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export enum AudioFile {
  Corn = 'corn.mp3',
  Heart = 'heart.mp3',
  LevelUp = 'levelup.mp3',
  Music = 'music.mp3',
  Pea = 'pea.mp3',
  PowerUp = 'powerup.mp3',
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audio = new FormGroup({
    sfx: new FormControl<boolean>(true),
    music: new FormControl<boolean>(false),
  });

  #audioCache: Map<AudioFile, string> = new Map();
  #activeMusic!: HTMLAudioElement;

  constructor(private http: HttpClient) {
    const sfx = localStorage.getItem('sfx');
    const music = localStorage.getItem('music');

    if (sfx) {
      this.audio.get('sfx')?.setValue(JSON.parse(sfx));
    }

    if (music) {
      this.audio.get('music')?.setValue(JSON.parse(music));
    }

    this.audio.valueChanges.subscribe(({ sfx, music }) => {
      localStorage.setItem('sfx', JSON.stringify(sfx));
      localStorage.setItem('music', JSON.stringify(music));
    });

    Object.values(AudioFile).forEach((file) => this.preloadAudio(file));
  }

  get changed() {
    return !this.audio.get('sfx')?.value || !!this.audio.get('music')?.value;
  }

  playSfx(src: AudioFile) {
    if (this.audio.get('sfx')?.value) {
      this.play(src, false);
    }
  }

  playMusic() {
    if (this.audio.get('music')?.value) {
      this.play(AudioFile.Music, true);
    }
  }

  stopMusic() {
    if (this.#activeMusic) {
      const audio = this.#activeMusic;
      const duration = 3000;
      const fadeStep = 0.05;
      const interval = duration / (1 / fadeStep);

      const fade = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - fadeStep);
        if (audio.volume === 0) {
          audio.pause();
          audio.currentTime = 0;
          clearInterval(fade);
        }
      }, interval);
    }
  }

  setMusicSpeed(speed: number) {
    if (this.#activeMusic) {
      this.#activeMusic.playbackRate = speed;
    }
  }

  reset() {
    this.audio.get('sfx')?.setValue(true);
    this.audio.get('music')?.setValue(false);
  }

  private play(src: AudioFile, loop: boolean) {
    const audioUrl = this.#audioCache.get(src);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.loop = loop;
      audio.play();

      if (loop) {
        this.#activeMusic = audio;
      }
    }
  }

  private preloadAudio(audio: AudioFile) {
    this.http
      .get(audio, { responseType: 'blob' })
      .subscribe((blob) => this.#audioCache.set(audio, URL.createObjectURL(blob)));
  }
}
