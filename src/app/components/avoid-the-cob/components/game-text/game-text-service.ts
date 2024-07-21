import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameTextService {
  text: string = '';
  subText: string = '';

  show(text: string, subText: string, duration: number) {
    this.text = text;
    this.subText = subText;
    const textClass = document.getElementsByTagName('app-game-text')[0].classList;

    console.log(textClass);

    textClass.remove('opacity-0');
    setTimeout(() => {
      textClass.add('opacity-0');
    }, duration);
  }
}
