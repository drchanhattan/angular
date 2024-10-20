import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GameAudio } from '../models/game-audio/game-audio';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audio = new FormGroup({
    sfx: new FormControl<boolean>(true),
    music: new FormControl<boolean>(true),
  });
  #activeMusic!: HTMLAudioElement;

  constructor(private assetService: AssetService) {
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
  }

  get changed() {
    return !this.audio.get('sfx')?.value || !!this.audio.get('music')?.value;
  }

  playSfx(src: GameAudio) {
    if (this.audio.get('sfx')?.value) {
      this.play(src, false);
    }
  }

  playMusic() {
    if (this.audio.get('music')?.value) {
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
    this.audio.get('sfx')?.setValue(true);
    this.audio.get('music')?.setValue(true);
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
