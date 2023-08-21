import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService, private MessageService: MessageService){}

  loading:boolean = false;
  showGetStarted:boolean = false;
  showLogOut:boolean = false;
  message!: Message[]

   user = localStorage.getItem('user')

   ngOnInit(): void {
     this.isUserLoggedin()

     this.message = [
      { severity: 'warn', summary: 'Waning', detail: 'This project is still under constuction.' },
     ]

   }

    show(){
      
    }



  menuItems = [
    {
      label: 'Income',
      className: 'menu',
      routerLink: '/income'
    },
    {
      label: 'Expenses',
      className: 'menu',
      routerLink: '/expenses'
    },
    {
      label: 'Invoice',
      className: 'menu',
      routerLink: '/comming-soon'
    }
  ]


  isUserLoggedin(){
    if(!this.user){
      this.showGetStarted = true
      this.showLogOut = false
    } else{
      this.showGetStarted = false; 
      this.showLogOut = true;
    }
  }

  navHome(){
    this.route.navigate(['/register'])
  }

  logOut(){
    this.loading = true; 
    this.authService.signOut()
    localStorage.removeItem('user')
    this.route.navigate(['/']) 
    this.isUserLoggedin()
    this.loading = false;
  }

}
