import {GameObject} from './game-object';
import {GameObjectShape} from './game-object-shape';

export class Canvas {
    public w!: number;
    public h!: number;
    public particles: GameObject[] = [];

    public static drawObject(context: CanvasRenderingContext2D, object: GameObject, sizeMultiplier = 1): void {
        // First define the colour
        context.fillStyle = object.colour;
        // Begin drawing
        context.beginPath();

        if (object.shape === GameObjectShape.Rect) {
            // Squares are drawn from the top left corner so its necessary to recenter the x and y
            const drawX = object.x - (object.size / 2);
            const drawY = object.y - (object.size / 2);
            context.fillRect(drawX, drawY, object.size * sizeMultiplier, object.size * sizeMultiplier);
        } else {
            // Circles are drawn from the center
            context.arc(object.x, object.y, object.size * sizeMultiplier, 0, 2 * Math.PI);
        }

        // End drawing
        context.closePath();

        // Fill
        context.fill();
    }

    public drawParticles(context: CanvasRenderingContext2D): void {
        this.particles.forEach(object => {
            // Draw a single particle
            Canvas.drawObject(context, object, 0.25);
            object.move();
        });
    }

    public particleDecay(): void {
        // Particle decay
        setInterval(() => {
            if (this.particles.length) {
                this.particles.splice(0, Math.ceil(this.particles.length * 0.2));
            }
        }, 2000);
    }

    public wallCollision(object: GameObject): void {
        if (object.detectWallCollisionX(this.w)) {
            const centreX = this.w / 2;
            const sign = Math.sign(object.deltaX);
            if ((object.x < centreX && sign === -1) || (object.x > centreX && sign === 1)) {
                object.reverseDirection(true);
            }
        }

        if (object.detectWallCollisionY(this.h)) {
            const centreY = this.h / 2;
            const sign = Math.sign(object.deltaY);
            if ((object.y < centreY && sign === -1) || (object.y > centreY && sign === 1)) {
                object.reverseDirection(false);
            }
        }
    }

    public createParticles(object: GameObject, count: number, speed: number): void {
        for (let i = 0; i < count; i++) {
            const p = new GameObject();
            p.x = object.x;
            p.y = object.y;
            p.setRandomDelta(true, true, speed);
            p.size = object.size;
            p.shape = object.shape;
            p.colour = object.colour;

            this.particles.push(p);
        }
    }
}
