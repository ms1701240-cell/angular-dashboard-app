import { Component, model } from '@angular/core';

@Component({
  selector: 'app-prograssbar',
  imports: [],
  templateUrl: './prograssbar.html',
  styleUrl: './prograssbar.css',
})
export class Prograssbar {
  currentstep=model.required<number>();
  getstepclass(stepnum: number) {
  if (this.currentstep() > stepnum) {
    return 'bg-green-500 text-white border-green-500';
  } else if (this.currentstep() === stepnum) {
    return 'border-blue-500 text-blue-500 font-bold';
  } else {
    return 'border-gray-300 text-gray-400';
  }
}

steps = [
    { number: 1, title: 'STUDENT INFO' },
    { number: 2, title: 'PARENT INFO' },
    { number: 3, title: 'MEDICAL INFO' },
    { number: 4, title: 'DOCUMENTS' },
    { number: 5, title: 'REVIEW' },
  ];

}
