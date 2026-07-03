import { computed, effect, Injectable, signal } from '@angular/core';
import { GameAudio } from '../models/game-audio/game-audio';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  sfx = signal<boolean>(true);
  music = signal<boolean>(false);
  #activeMusic!: HTMLAudioElement;
  changed = computed(() => !this.sfx() || this.music());

  constructor(private assetService: AssetService) {
    const sfx = localStorage.getItem('sfx');
    const music = localStorage.getItem('music');

    if (sfx) {
      this.sfx.set(JSON.parse(sfx));
    }

    if (music) {
      this.music.set(JSON.parse(music));
    }

    effect(() => {
      localStorage.setItem('sfx', JSON.stringify(this.sfx()));
      localStorage.setItem('music', JSON.stringify(this.music()));
    });
  }

  playSfx(src: GameAudio) {
    if (this.sfx()) {
      this.play(src, false);
    }
  }

  playMusic() {
    if (this.music()) {
      this.play(GameAudio.Music, true);
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
    this.sfx.set(true);
    this.music.set(false);
  }

  private play(src: GameAudio, loop: boolean) {
    const url = this.assetService.audio$.value.get(src);
    if (url) {
      const audio = new Audio(url);
      audio.loop = loop;
      audio.play();

      if (loop) {
        this.#activeMusic = audio;
      }
    }
  }
}
