import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class InputComponent {
  placeholder = input();
}
