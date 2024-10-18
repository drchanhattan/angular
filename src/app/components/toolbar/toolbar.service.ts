import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  hideMenuBtn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  get showLocationBtn() {
    return this.router.url !== '/' && this.router.url !== '/avoid-the-cob';
  }
}
