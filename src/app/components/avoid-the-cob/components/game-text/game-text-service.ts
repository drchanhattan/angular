import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  text: string = '';
  subtext: string = '';

  show(text: string, subtext: string, duration: number) {
    this.text = text;
    this.subtext = subtext;
    const textClass = document.getElementsByTagName('app-game-text')[0].classList;

    textClass.remove('opacity-0');
    setTimeout(() => {
      textClass.add('opacity-0');
    }, duration);
  }
}
