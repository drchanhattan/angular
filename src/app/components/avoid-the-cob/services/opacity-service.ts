import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpacityService {
  show(elementTag: string) {
    const classList = document.getElementsByTagName(elementTag)[0].classList;
    classList.remove('opacity-0');
    classList.remove('pointer-events-none');
  }

  hide(elementTag: string) {
    const classList = document.getElementsByTagName(elementTag)[0].classList;
    classList.add('opacity-0');
    classList.add('pointer-events-none');
  }
}
