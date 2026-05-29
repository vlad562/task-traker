import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class InputComponent {
  placeholder = input();

  onChangeEvent = output<string>();

  onChange(value: string) {
    const transformValue = value.toLowerCase().trim();
    this.onChangeEvent.emit(transformValue);
  }
}
