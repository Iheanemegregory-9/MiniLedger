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

  
  constructor(private route: Router, private authService: AuthService){}

  ngOnInit(): void {


   

  }
  


  
  createAccount(email:string, password:string){

    this.authService.createAccount(email, password).then((res)=>{

      localStorage.setItem('user', res.user.uid)
      console.log(res.user);
    }, err =>{
      console.log(err.message);
    })
    // this.route.navigate(['/verify'])
  }

}
