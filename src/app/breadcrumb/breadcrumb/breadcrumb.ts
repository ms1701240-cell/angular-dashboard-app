import { Component } from '@angular/core';
import { RouterLink,Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
interface BreadcrumbItem {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink,CommonModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
breadcrumb=signal<BreadcrumbItem[]>([]);
constructor(private router:Router){
   this.breadcrumb.set(this.CreateBreadcrumbs())
  this.router.events.pipe(
    filter((event):event is NavigationEnd=>event instanceof NavigationEnd)
  ).subscribe(()=>{
    this.breadcrumb.set(this.CreateBreadcrumbs())
  })
}

private CreateBreadcrumbs():BreadcrumbItem[]{
const url=this.router.url;
const segments=url.split('/').filter(segment=>segment!=='');
let accumulatedurl='';
return segments.map(s=>{
  accumulatedurl+=`/${s}`
  return{
    label:s,
    url:accumulatedurl
  }
})
}
}
