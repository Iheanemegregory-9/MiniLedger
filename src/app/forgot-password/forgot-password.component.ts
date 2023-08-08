import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthService, private route : Router){}

  email!:string;


  resetPassword(email:string){
    this.authService.resetPassword(email).then((res)=>{
      console.log(res);
    }, err =>{
      console.log(err);
    })

    this.route.navigate(['/login'])
  }

}
