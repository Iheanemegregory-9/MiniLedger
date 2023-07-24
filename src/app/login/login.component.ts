import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messages!: Message[];

  
  constructor(private route: Router){}

  ngOnInit(): void {
  }
  


  
  login(){
    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Message Content' }];
    // this.route.navigate(['/dashboard'])
  }
}
