import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSelectorService {
  currentTheme$ = new BehaviorSubject<'light-theme' | 'dark-theme'>('light-theme');

  constructor() {
    const localTheme = window.localStorage.getItem('theme') as 'light-theme' | 'dark-theme';
    this.setTheme(localTheme ?? this.currentTheme$.value);
  }

  setTheme(theme: 'light-theme' | 'dark-theme') {
    document.documentElement.classList.remove(this.currentTheme$.value);
    document.documentElement.classList.add(theme);
    this.currentTheme$.next(theme);
    window.localStorage.setItem('theme', theme);
  }

  get isLight() {
    return this.currentTheme$.value === 'light-theme';
  }

  get isDark() {
    return this.currentTheme$.value === 'dark-theme';
  }
}
