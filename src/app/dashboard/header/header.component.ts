import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private route: Router, private authService: AuthService){}

  loading:boolean = false;
  isLoggedIn:boolean = true;

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

  navHome(){
    this.route.navigate(['/register'])
  }

  logOut(){
    this.isLoggedIn = false
    this.authService.signOut().then((res)=>{

      localStorage.removeItem('user')
    })
  }

}
