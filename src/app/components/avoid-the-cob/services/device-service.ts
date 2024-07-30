import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  readonly isTouchScreen: boolean = window.matchMedia('(pointer: coarse)').matches;
}
