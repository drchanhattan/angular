import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from 'obscenity';
import { BehaviorSubject } from 'rxjs';
import { AvoidTheCobComponent } from '../../components/avoid-the-cob/avoid-the-cob.component';
import { FirebaseService } from '../../components/avoid-the-cob/services/firebase.service';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [CommonModule, ReactiveFormsModule, AvoidTheCobComponent],
})
export class GameComponent {
  @HostBinding('class') hostClasses = 'flex w-[100vw] h-[100vh]';

  disabled$ = new BehaviorSubject<boolean>(true);

  constructor(public firebaseService: FirebaseService) {
    window.localStorage.setItem('playerName', '');
    const localPlayerName = window.localStorage.getItem('playerName');

    if (localPlayerName) {
      this.firebaseService.playerName.setValue(localPlayerName);
      this.disabled$.next(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    location.reload();
  }

  enterName(event: KeyboardEvent) {
    const name = this.firebaseService.playerName.value;

    const matcher = new RegExpMatcher({
      ...englishDataset.build(),
      ...englishRecommendedTransformers,
    });
    if (name && matcher.hasMatch(name)) {
      console.log('The input text contains profanity');
    }

    if (event.key === 'Enter' && name?.length) {
      window.localStorage.setItem('playerName', name);
      this.disabled$.next(false);
    }
  }
}
