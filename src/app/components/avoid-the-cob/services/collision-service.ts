import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollisionService {
  hide(elementTag: string) {
    const classList = document.getElementsByTagName(elementTag)[0].classList;
    classList.add('opacity-0');
    classList.add('pointer-events-none');
  }

  show(elementTag: string) {
    const classList = document.getElementsByTagName(elementTag)[0].classList;
    classList.remove('opacity-0');
    classList.remove('pointer-events-none');
  }
}
