import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  visible: boolean = true;
  header: string = '';

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
