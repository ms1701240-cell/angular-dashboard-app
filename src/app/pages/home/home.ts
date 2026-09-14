import { Component, signal } from '@angular/core';
import { Authservice } from '../../core/services/authservice';
import { inject } from '@angular/core';
import { LoginResponse } from '../../core/Models/LoginResponse';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
authservice=inject(Authservice);
userinf=signal<LoginResponse|null>(null);
isloading=signal<boolean>(true);
ngOnInit(): void {
  this.authservice.getUserInfo().subscribe({
    next:(res:LoginResponse)=>{
      this.userinf.set(res);
      this.isloading.set(false);
    },
    error:(err)=>{
      console.log(err);
      this.isloading.set(false);
    }
  })
}
}

