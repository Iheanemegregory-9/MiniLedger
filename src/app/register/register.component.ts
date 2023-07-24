import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messages!: Message[];

  
  constructor(private route: Router){}

  ngOnInit(): void {
  }
  


  
  createAccount(){
    this.route.navigate(['/verify'])
  }

}
