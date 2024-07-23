import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { GameScore } from '../../models/game-score/game-score';
import { PlayerNameService } from '../player-name/player-name-service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private scoresDocRef = doc(this.firestore, 'gameData/highScores');

  constructor(private nameService: PlayerNameService) {}

  async saveScore(score: number): Promise<void> {
    const firstName = this.nameService.firstName.value?.toUpperCase();
    const lastName = this.nameService.lastName.value?.toUpperCase();

    if (!firstName || !lastName) {
      console.log('Name not provided.');
      return;
    }

    try {
      const scoresData = await this.getAllScores();
      const existingScore = scoresData.find((s) => s.firstName === firstName && s.lastName === lastName);

      let updated = false;

      if (existingScore) {
        if (score > existingScore.score) {
          existingScore.score = score;
          updated = true;
        }
      } else {
        scoresData.push({ firstName, lastName, score });
        updated = true;
      }

      if (updated) {
        this.updateScores(scoresData);
      }
    } catch (e) {
      console.error('Error saving or updating score: ', e);
    }
  }

  async getAllScores(): Promise<GameScore[]> {
    try {
      const docSnapshot = await getDoc(this.scoresDocRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data()['highScores'] || [];
      } else {
        return [];
      }
    } catch (e) {
      console.error('Error retrieving scores: ', e);
      return [];
    }
  }

  private async updateScores(scores: GameScore[]) {
    this.sortAndLimitScores(scores);
    await setDoc(this.scoresDocRef, { highScores: scores });
    console.log('Scores successfully updated!');
  }

  private sortAndLimitScores(scores: GameScore[]): void {
    scores.sort((a, b) => b.score - a.score);
  }
}
