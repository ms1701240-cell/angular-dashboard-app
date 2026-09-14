import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
isopenersidebar= signal<boolean>(true);

togglemenu(){
 this.isopenersidebar.update((value)=>!value);

}
}
