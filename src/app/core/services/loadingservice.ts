import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loadingservice {
  isloading=signal<boolean>(false);

  show()
  {
    this.isloading.set(true);
  }

  hide()
  {
    this.isloading.set(false);
  }
}
