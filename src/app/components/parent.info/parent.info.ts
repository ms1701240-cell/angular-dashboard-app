import { Component, input } from '@angular/core';
import { FormGroup,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-parent-info',
  imports: [ReactiveFormsModule],
  templateUrl: './parent.info.html',
  styleUrl: './parent.info.css',
})
export class ParentInfo {
GrandForm=input.required<FormGroup>()
}
