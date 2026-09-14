import { Component, input, Input, model, output, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-modalshared',
  imports: [],
  templateUrl: './modalshared.html',
  styleUrl: './modalshared.css',
})
export class Modalshared {
 ismodelopen=model.required<boolean>();
 title=input<string>('');
 onsave=output<void>();
 trriggersave(){
    this.onsave.emit();
 }
 closemodel(){
  this.ismodelopen.set(false)
 }
}
