import { Component, inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import { Authservice } from '../../core/services/authservice';
import { Router } from '@angular/router';
import { LoginResponse } from '../../core/Models/LoginResponse';
import { Loadingservice } from '../../core/services/loadingservice';
@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isloading=inject(Loadingservice)
fb=inject(FormBuilder);
forms=this.fb.group({
  username:['',[Validators.required]],
  password:['',[Validators.required]]
})
authService=inject(Authservice);
router=inject(Router);
Login(){
  if(this.forms.valid){
  this.authService.login({username:this.forms.value.username??'', password:this.forms.value.password??''}).subscribe({
    next:(res:LoginResponse)=>{
      this.isloading.hide()
      this.authService.savedToken(res.accessToken);
      this.router.navigate(['/']);
    },
    error:(err)=>{
      console.log(err);
    
    }
  })
}else{
  this.forms.markAllAsTouched();
  
}
}
}
