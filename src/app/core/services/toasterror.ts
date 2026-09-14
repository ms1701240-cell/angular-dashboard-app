import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Toasterror {
  message=signal<string|null>(null);

  show(msg:string){
    this.message.set(msg);
    setTimeout(() => this.message.set(null), 2000);
  }
}
