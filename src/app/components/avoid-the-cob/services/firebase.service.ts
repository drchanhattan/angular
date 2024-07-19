import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  playerName = new FormControl<string | null>(null);

  constructor() {}

  async saveScore(score: number) {
    try {
      const scoresCollection = collection(this.firestore, 'scores');
      await addDoc(scoresCollection, {
        playerName: this.playerName.value,
        score: score,
        timestamp: new Date(),
      });
      console.log('Score saved successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async getAllScores() {
    try {
      const scoresCollection = collection(this.firestore, 'scores');
      const querySnapshot: QuerySnapshot = await getDocs(scoresCollection);
      const scores: any[] = [];
      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });
      return scores;
    } catch (e) {
      console.error('Error retrieving scores: ', e);
      return [];
    }
  }
}
