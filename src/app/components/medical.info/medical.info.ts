import { Component, input } from '@angular/core';
import { ReactiveFormsModule,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-medical-info',
  imports: [ReactiveFormsModule],
  templateUrl: './medical.info.html',
  styleUrl: './medical.info.css',
})
export class MedicalInfo {
GrandForm=input.required<FormGroup>()
}
