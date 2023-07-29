import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService){}

  loading:boolean = false;
  showGetStarted:boolean = false;
  showLogOut:boolean = false;

   user = localStorage.getItem('user')

   ngOnInit(): void {
     this.isUserLoggedin()
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
    this.authService.signOut()
    localStorage.removeItem('user')
    this.route.navigate(['/'])
    this.isUserLoggedin()
  }

}
