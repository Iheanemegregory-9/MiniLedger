import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messages!: Message[];

  email!:string
  password!:string; 
  userID!: string
  userIsAnon!:boolean;

  
  constructor(private route: Router, private authService: AuthService){}

  ngOnInit(): void {


   

  }
  


  
  createAccount(email:string, password:string,){

    this.authService.createAccount(email, password).then((res)=>{
      this.userID = res.user.uid;
      this.userIsAnon = res.user.isAnonymous;
      // this.userEmail = res.user.email;

      localStorage.setItem('user', res.user.uid)
      this.authService.linkUsertoDB(this.userID, this.userIsAnon)
      console.log(res.user);
      this.route.navigate(['/'])
    }, err =>{
      console.log(err.message);
    })
    this.route.navigate(['/'])
  }

}
