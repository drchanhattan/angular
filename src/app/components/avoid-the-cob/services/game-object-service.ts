import { Injectable } from '@angular/core';
import { GameObject } from '../models/game-object/game-object';
import { GameObjectBehaviour } from '../models/game-object/game-object-behaviour';
import { GameObjectDefaults } from '../models/game-object/game-object-defaults';
import { GameObjectGroup } from '../models/game-object/game-object-group';
import { GameObjectSettings } from '../models/game-object/game-object-setttings';
import { GameObjectShape } from '../models/game-object/game-object-shape';
import { GameObjectType } from '../models/game-object/game-object-type';
import { CanvasService } from './canvas-service';
import { CollisionService } from './collision-service';
import { CursorService } from './cursor.service';
import { ParticleService } from './particle-service';

@Injectable({
  providedIn: 'root',
})
export class GameObjectService {
  peas: GameObjectGroup;
  corns: GameObjectGroup;
  powerUps: GameObjectGroup;
  hearts: GameObjectGroup;
  mobs: GameObjectGroup;

  constructor(
    private canvasService: CanvasService,
    private cursor: CursorService,
    private particleService: ParticleService,
  ) {
    this.peas = new GameObjectGroup(GameObjectDefaults.pea().count, GameObjectDefaults.pea().settings);
    this.corns = new GameObjectGroup(GameObjectDefaults.corn().count, GameObjectDefaults.corn().settings);
    this.powerUps = new GameObjectGroup(GameObjectDefaults.powerUp().count, GameObjectDefaults.powerUp().settings);
    this.hearts = new GameObjectGroup(GameObjectDefaults.heart().count, GameObjectDefaults.heart().settings);
    this.mobs = new GameObjectGroup(GameObjectDefaults.mob().count, GameObjectDefaults.mob().settings);
  }

  processGameObjects(paused: boolean, collisionService: CollisionService, mobMode: boolean) {
    this.allObjects().forEach((obj: GameObject) => {
      if (!obj.isDestroyed) {
        this.canvasService.drawObject(this.canvasService.context, obj);

        if (paused) {
          this.ejectObject(obj, mobMode);
        } else {
          this.customObjectBehaviour(obj, mobMode);
          collisionService.processCollisions(obj);
        }

        obj.move();
      }
    });
  }

  destroyAll() {
    this.peas.objects = [];
    this.corns.objects = [];
    this.powerUps.objects = [];
    this.hearts.objects = [];
    this.mobs.objects = [];
  }

  objectsCleared() {
    const peas = this.peas.objects;
    const blueCorn = this.corns.objects.filter((corn) => corn.isPea);

    return ![...peas, ...blueCorn].some((obj) => !obj.isDestroyed && obj.isWithinViewport);
  }

  reset() {
    this.resetObjectGroup(this.peas, GameObjectDefaults.pea());
    this.resetObjectGroup(this.corns, GameObjectDefaults.corn());
    this.resetObjectGroup(this.powerUps, GameObjectDefaults.powerUp());
    this.resetObjectGroup(this.hearts, GameObjectDefaults.heart());
    this.resetObjectGroup(this.mobs, GameObjectDefaults.mob());
  }

  private resetObjectGroup(objectGroup: GameObjectGroup, settings: { count: number; settings: GameObjectSettings }) {
    objectGroup.editSettings(settings.settings.size, settings.settings.speed, settings.count);
  }

  private allObjects() {
    return [
      ...this.peas.objects,
      ...this.corns.objects,
      ...this.powerUps.objects,
      ...this.hearts.objects,
      ...this.mobs.objects,
    ];
  }

  private customObjectBehaviour(obj: GameObject, mobMode: boolean) {
    const attract = obj.behaviourIncludes(GameObjectBehaviour.Attract);
    const repel = obj.behaviourIncludes(GameObjectBehaviour.Repel);
    const blue = obj.behaviourIncludes(GameObjectBehaviour.Blue);
    const slow = obj.behaviourIncludes(GameObjectBehaviour.Slow);

    if (mobMode) {
      this.magnetise(obj, 80, 2, false, true);
    }
    if (attract) {
      this.magnetise(obj, 20, 8, false);
      this.cursor.pulse();
    }
    if (repel) {
      this.magnetise(obj, 18, 5, true);
      this.cursor.pulse();
    }
    if (blue) {
      obj.type = GameObjectType.Pea;
      obj.color = '#0055FF';
      obj.size = this.peas.objects[0].size;
      obj.shape = GameObjectShape.Circle;
    }
    if (slow) {
      obj.deltaX = 1 * (Math.random() < 0.5 ? -1 : 1);
      obj.deltaY = 1 * (Math.random() < 0.5 ? -1 : 1);
      this.cursor.pulse();
    }
  }

  private magnetise(
    object: GameObject,
    radiusMultiplier: number,
    speed: number,
    repel: boolean,
    collisionEnabled = true,
  ) {
    const obj = Object.assign({}, this.cursor.object);
    obj.size = obj.size * radiusMultiplier;

    if (object.detectCollision(obj)) {
      let dx = this.cursor.object.x - object.x;
      let dy = this.cursor.object.y - object.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;
      dx *= speed;
      dy *= speed;

      if (!object.detectWallCollisionOnAxis('x', window.innerWidth) || !collisionEnabled) {
        repel ? object.applyForce('x', -dx) : object.applyForce('x', dx);
      }

      if (!object.detectWallCollisionOnAxis('y', window.innerHeight) || !collisionEnabled) {
        repel ? object.applyForce('y', -dy) : object.applyForce('y', dy);
      }
    }
  }

  private ejectObject(obj: GameObject, mobMode: boolean) {
    obj.deltaY = obj.deltaY + 0.075;
    if (mobMode) {
      obj.applyForce('y', -5);
    } else {
      this.magnetise(obj, 500, 7, true, false);
      this.particleService.create(obj, 1, 0.2);
    }
  }
}
