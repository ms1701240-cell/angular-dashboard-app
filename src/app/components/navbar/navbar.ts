import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LucideAngularModule,Sun,Moon} from 'lucide-angular';
import { Themeservice } from '../../core/services/themeservice';
import { Datanotification } from '../../core/services/datanotification';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,LucideAngularModule,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sun=Sun;
  moon=Moon
  themeservice=inject(Themeservice)
  
  notifyservice=inject(Datanotification)
  isnotifyopen=signal<boolean>(false)
   togglenotify(){
    
     this.isnotifyopen.update((v)=>!v)
     this.notifyservice.cleranotification()
   }

  ismenuOpen= signal<boolean>(false);
  tooggleMenu() {
    this.ismenuOpen.update((value) => !value);
  }

  isuserprofile=signal<boolean>(false);
  togglemenuprofile(){
    this.isuserprofile.update(p=>!p)
  }
  closemenuprofile(){
    this.isuserprofile.set(false)
  }
}
