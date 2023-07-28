import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messages!: Message[];

  email!:string
  password!:string;

  
  constructor(private route: Router, private authService: AuthService){}

  ngOnInit(): void {
  }
  


  
  login(email:string, password:string){
    this.authService.signIn(email, password).then((res)=>{
      localStorage.setItem('user', res.user.uid);
      console.log(res.user);
      
    })
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    // this.route.navigate(['/dashboard'])
  }
}
