import { Component, Input, model } from '@angular/core';
import { input } from '@angular/core';
@Component({
  selector: 'app-paginationshared',
  imports: [],
  templateUrl: './paginationshared.html',
  styleUrl: './paginationshared.css',
})
export class Paginationshared {
  currentpage=model.required<number>()
  islastpage=model.required<boolean>()
}
