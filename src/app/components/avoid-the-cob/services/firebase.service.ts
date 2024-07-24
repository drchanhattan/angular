import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { PlayerNameService } from '../components/player-name/player-name-service';
import { GameScore } from '../models/game-score/game-score';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private scoresDocRef = doc(this.firestore, 'gameData/highScores');

  constructor(private nameService: PlayerNameService) {}

  async saveScore(score: number): Promise<void> {
    const name = this.nameService.name.value?.toUpperCase();

    if (!name) {
      console.log('Name not provided.');
      return;
    }

    try {
      let scoresData = await this.getAllScores();
      const existingScore = scoresData.find((s) => s.name === name);

      let updated = false;

      if (existingScore) {
        if (score > existingScore.score) {
          existingScore.score = score;
          updated = true;
        }
      } else {
        scoresData.push({ name, score });
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
    if (scores.length > 20) {
      scores.length = 20;
    }
  }
}
