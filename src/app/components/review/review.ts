import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review',
  imports: [ReactiveFormsModule],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {
GrandForms=input.required<FormGroup>()
 editStep = output<number>();

oneditnum(stepnum: number) {

  this.editStep.emit(stepnum);
}
}
