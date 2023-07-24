import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private route: Router){}

  loading:boolean = false;

  menuItems = [
    {
      label: '',
      className: 'user-home',
      icon: 'pi pi-user',
      routerLink: '/dashboard'
    },
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

  logOut(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.route.navigate(['/register']);
    }, 2000);
  }

  navHome(){
    this.route.navigate(['/dashboard'])
  }

}
