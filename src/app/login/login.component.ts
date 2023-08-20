import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  messages!: Message[];

  email!:string
  password!:string;

  loading:boolean = false;

  btnMessage = "Sign in"

  localEmail:any;
  isAuth:any;
  errMessage!:string;

  
  constructor(private route: Router, private authService: AuthService, private messageService: MessageService){}

  ngOnInit(): void {
    this.authService.currentUser()
  }
  
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User logged in' });
}

showErrMessage(){
  this.messageService.add({severity: 'error', summary: 'Opps', detail: this.errMessage})
}

changeBtnState(){
  this.loading = true;
  this.btnMessage = "Logging you in..."
}

  
   login(email:string, password:string){
    this.changeBtnState()
    this.authService.signIn(email, password).then((res)=>{
      localStorage.setItem('user', res.user.uid);
      this.localEmail = res.user.email
      console.log(res.user);
      localStorage.setItem('email', this.localEmail);
      this.route.navigate(['/']);
      this.show()
    }, err =>{
      if(err.message == 'Firebase: Error (auth/user-not-found).'){
        this.errMessage = 'User with the specified email does not exists'
      }else if (err.message == 'Firebase: Error (auth/wrong-password).'){
        this.errMessage = 'Wrong password'
      }else{
        this.errMessage = 'Something went wrong'
      }
      console.log(err.message);
      this.showErrMessage()
      this.loading = false
      this.btnMessage = 'Sign in'
    })
    this.loading = false
  }
}
