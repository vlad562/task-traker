import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appContextMenu]',
  standalone: true,
})
export class ContextMenuDirective {
  constructor() {}
  @Output() appContextMenu = new EventEmitter<{ x: number; y: number }>();  
  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.appContextMenu.emit({
      x: e.clientX,
      y: e.clientY,
    });
  }
}
