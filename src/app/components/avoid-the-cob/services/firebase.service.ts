import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { NameService } from './name-service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private scoresDocRef = doc(this.firestore, 'gameData/highScores');

  constructor(private nameService: NameService) {}

  async saveScore(score: number): Promise<void> {
    const name = this.nameService.name.value?.toUpperCase();

    if (name) {
      try {
        const scoresData = await this.getAllScores();
        const existingScore = scoresData.find((s) => s.name === name);

        if (existingScore) {
          if (score > existingScore.score) {
            existingScore.score = score;
            console.log('Score updated successfully!');
          } else {
            console.log('Existing score is higher or equal. No update made.');
          }
        } else {
          scoresData.push({ name, score });
          console.log('Score saved successfully!');
        }

        this.sortAndLimitScores(scoresData);
        await setDoc(this.scoresDocRef, { highScores: scoresData });
      } catch (e) {
        console.error('Error saving or updating score: ', e);
      }
    }
  }

  async getAllScores(): Promise<{ name: string; score: number }[]> {
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

  private sortAndLimitScores(scores: { name: string; score: number }[]): void {
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 10) {
      scores.length = 10;
    }
  }
}
