import {GameObject} from '../../game/game-object';
import {GameObjectShape} from '../../game/game-object-shape';
import {Canvas} from '../../game/canvas';
import {Cursor} from '../../game/cursor';

export class Corn {
    public color = '#ffc107';
    public objects: GameObject[] = [];
    public count!: number;
    public size!: number;
    public speed!: number;

    public createNewCorn(newGame: boolean, cursor: Cursor, canvas: Canvas): void {
        // Spawn randomly in the central 3rd of the screen
        let xRandomSpawn = Math.floor((Math.random() * (canvas.w / 3)) + (canvas.h / 3));
        let yRandomSpawn = canvas.h / 2;

        for (let i = 0; i < this.count; i++) {
            this.objects[i] = new GameObject();
            this.objects[i].x = newGame ? cursor.x : xRandomSpawn;
            this.objects[i].y = newGame ? cursor.y : yRandomSpawn;
            this.objects[i].setRandomDelta(true, true, this.speed);
            this.objects[i].size = this.size;
            this.objects[i].shape = GameObjectShape.Rect;
            this.objects[i].colour = this.color;
        }
    }
}
