import { Component } from '@angular/core';
import {inject} from '@angular/core';

import { ProductServiceTs } from '../../core/services/dashboard.service.ts';
import { dashboard } from '../../core/Models/dashboard.model.js';
import { signal } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
service=inject(ProductServiceTs);
dash=signal(<dashboard[]>([]));
ngOnInit(): void {
  this.service.getproducts().subscribe((res)=>{
    this.dash.set(res.stats);
  })  
}

}
