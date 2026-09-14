import { Component, input } from '@angular/core';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-documents',
  imports: [ReactiveFormsModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css',
})
export class Documents {
GrandForm=input.required<FormGroup>();
}
