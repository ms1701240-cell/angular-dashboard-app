import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dashboard } from '../../core/Models/dashboard.model';
@Injectable({
  providedIn: 'root',
})
export class ProductServiceTs  {
http=inject(HttpClient);
getproducts(){
 return  this.http.get<{stats:dashboard[]}>('/stats.json');
}
}
