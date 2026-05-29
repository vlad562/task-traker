import { Injectable, signal } from '@angular/core';

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
  state = signal<DragState>({
    activeId: null,
    fromColumn: null,
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  setDragState(state: Partial<DragState>) {
    this.state.update((current) => ({
      ...current,
      ...state,
    }));
  }
  clear() {
    this.state.set({
      activeId: null,
      fromColumn: null,
      offsetX: 0,
      offsetY: 0,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  }
}
