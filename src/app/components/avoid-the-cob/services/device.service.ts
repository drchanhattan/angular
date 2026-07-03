import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  public readonly isTouch: boolean = window.matchMedia('(pointer: coarse)').matches;
}
