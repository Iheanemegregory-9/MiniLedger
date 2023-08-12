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

  firstName:string = '';
  lastName:string = '';
  email!:string
  password!:string; 
  userID!: string
  userIsAnon!:boolean;

  
  constructor(private route: Router, private authService: AuthService){}

  ngOnInit(): void {


   

  }
  


  
 async createAccount(email:string, password:string, firstName:string, lastName:string, id:string){

    // this.authService.sendEmailVerification(email)
    await this.authService.createAccount(email, password).then((res)=>{
      this.userID = res.user.uid;
        this.userIsAnon = res.user.isAnonymous;
      localStorage.setItem('user', res.user.uid)
      console.log(res.user)


      
    }, err =>{
      console.log(err.message);
    })
    
    this.authService.setUserDetails(firstName, lastName, this.userID).then(res =>{

      this.firstName = firstName;
      this.lastName = lastName;
      
      console.log('hello ' + `${this.firstName} ` + `${this.lastName}`);
      console.log(res);
    }, err =>{
      console.log(err.message);
      
    })

    

   await this.route.navigate(['/'])
  }

  

}
