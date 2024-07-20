import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { NameService } from './name-service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private scoresCollection = collection(this.firestore, 'scores');

  constructor(private nameService: NameService) {}

  async saveScore(score: number): Promise<void> {
    const playerName = this.nameService.playerName.value?.toUpperCase();

    if (playerName) {
      try {
        const existingDoc = await this.getExistingScoreDoc(playerName);

        if (existingDoc) {
          await this.updateScoreIfHigher(existingDoc, score);
        } else {
          await this.addNewScore(playerName, score);
        }
      } catch (e) {
        console.error('Error saving or updating score: ', e);
      }
    }
  }

  private async getExistingScoreDoc(playerName: string) {
    const q = query(this.scoresCollection, where('playerName', '==', playerName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0];
  }

  private async updateScoreIfHigher(existingDoc: any, score: number): Promise<void> {
    const existingScore = existingDoc.data()['score'];
    if (score > existingScore) {
      await updateDoc(existingDoc.ref, { score });
      console.log('Score updated successfully!');
    } else {
      console.log('Existing score is higher or equal. No update made.');
    }
  }

  private async addNewScore(playerName: string, score: number): Promise<void> {
    await addDoc(this.scoresCollection, { playerName, score });
    console.log('Score saved successfully!');
  }

  async getAllScores(): Promise<{ playerName: string; score: number }[]> {
    try {
      const querySnapshot = await getDocs(this.scoresCollection);
      const scores = querySnapshot.docs.map((doc) => ({
        playerName: doc.data()['playerName'],
        score: doc.data()['score'],
      }));
      return scores.sort((a, b) => b.score - a.score);
    } catch (e) {
      console.error('Error retrieving scores: ', e);
      return [];
    }
  }
}
