import { Component, input, Input } from '@angular/core';
import { required } from '@angular/forms/signals';
@Component({
  selector: 'app-tableshared',
  imports: [],
  templateUrl: './tableshared.html',
  styleUrl: './tableshared.css',
})
export class Tableshared {
  columns=input.required<string[]>()
}
