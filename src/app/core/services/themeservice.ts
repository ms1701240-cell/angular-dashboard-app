import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Themeservice {
  isdarkmode = signal<boolean>(false);
  
  
  private platformId = inject(PLATFORM_ID);

  constructor() {
    
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isdarkmode.set(true);
      }
    }
  }

  toggletheme() {
    this.isdarkmode.update((current) => {
      const newstate = !current;
      
     
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', newstate ? 'dark' : 'light');
      }
      
      return newstate;
    });
  }
}