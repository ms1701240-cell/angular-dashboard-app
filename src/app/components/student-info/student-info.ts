import { Component, input } from '@angular/core';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-student-info',
  imports: [ReactiveFormsModule],
  templateUrl: './student-info.html',
  styleUrl: './student-info.css',
})
export class StudentInfo {
GrandForm=input.required<FormGroup>()
}
