import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  messages!: Message[];
  loading:boolean = false;
  firstName!:string 
  lastName!:string 
  email!:any
  password!:string; 
  userID!: string
  userIsAnon!:boolean;
  btnMessage = 'Create an Account'; 
  errorMessage:any;

  
  constructor(private route: Router, private authService: AuthService, private messageService: MessageService){}

  ngOnInit(): void {
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your account has been created' });
  }

  showErrMessage() {
    this.messageService.add({ severity: 'error', summary: 'Opps', detail: this.errorMessage });
  }


  changeBtnStatus(){
    this.loading = true;
    this.btnMessage = 'Creating your account'
  }

  
 async createAccount(email:string, password:string, firstName:any, lastName:string,  id:string){
  this.changeBtnStatus()
    await this.authService.createAccount(email, password).then((res)=>{
      this.userID = res.user.uid;
      localStorage.setItem('user', res.user.uid);
    }, err =>{
      console.log(err.message);
      if(err.message == 'Firebase: Error (auth/email-already-in-use).'){
        this.errorMessage = 'A user with this email already exists'
      }else if (err.message = 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        this.errorMessage = 'Password should be at least 8 characters'
      }else{
        this.errorMessage = 'Something went wrong'
      }
      this.showErrMessage()
      this.loading = false;
      this.btnMessage = 'Create your account'
    })
   await this.authService.setUserDetails(firstName, email, lastName, this.userID).then(res =>{
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email
    }, err =>{
      console.log(err.message);
      this.errorMessage = err.message
    })
    
    this.loading = false;
    this.show()
   await this.route.navigate(['/'])
  }

  

}


