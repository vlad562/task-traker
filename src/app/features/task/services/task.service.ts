import { Injectable } from '@angular/core';

interface DragState {
  activeId: number | null;
  fromColumn: string | null;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class DragService {
  state: DragState = {
    activeId: null,
    fromColumn: null,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  setDragState(state: Partial<DragState>) {
    this.state = {
      ...this.state,
      ...state,
    };
  }
  clear() {
    this.state = {
      activeId: null,
      fromColumn: null,
      offsetX: 0,
      offsetY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }
}
