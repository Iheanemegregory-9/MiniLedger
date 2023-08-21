import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ExpenseService } from 'src/app/shared/expense.service';
import { Auth } from '@angular/fire/auth';
import { Message, MessageService } from 'primeng/api';




@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [MessageService]
})
export class ExpensesComponent implements OnInit {

  description!:string;
  category!:string
  price!:number  
  date:Date = new Date();
  loading:boolean = true;
  tableItem!:any[];
  firstName!:any;
  isVerified = true; 
  userID:any; 

  btnText = 'Add'

  userDetails: any = {};
  dataDetails:any;

  visible: boolean = false;


  constructor(
    private route: Router, 
    private expenseService: ExpenseService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private auth: Auth,
    private messageService: MessageService
    ){ }

 
  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid
        console.log(user.uid);
        this.isEmailVerified()
        this.getUserDetails(this.userID) 
      }
      else{
        console.log('no user');
      }
    })
    this.getExpenses()
    this.isEmailVerified()
  }


  show(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your new expense has been added' })
  }

  openForm(){
    this.visible = true;
  }
  
  addNewUserExpense(description:string, category:string, price:number, date:any, id:string){
    this.loading = true
    this.btnText = 'adding new expense'
    this.expenseService.setUserIncome(description, category, price, date, id).then(res =>{
      console.log(res);
      console.log('User income data added:' +  description, category, price, date); 
      this.show()
      this.loading = false
      this.btnText = 'Add'
      this.visible = false
    }, err =>{
      console.log(err);
    })
  }

  getExpenses(){
    this.expenseService.getExpenses().subscribe(res =>{
      this.tableItem = res;
      this.loading = false
    })
  }


  getUserDetails(id:string) {
    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid 
        this.expenseService.getUserData(id).then(res =>{
        this.userDetails = res.data()
          console.log(res.data());
        })
      }
      else{
        console.log('no user');
      }
    })
}  


  isEmailVerified(){
    const verified = this.authService.currentUser()?.emailVerified
    if(verified){
        this.isVerified = true
        } else if(!verified){
        this.isVerified = false
       }
  }


  sendVerificationEmail(){
    const user = this.auth.currentUser;
    this.authService.sendEmailVerification(user).then(()=>{

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Verification Email Sent' });
    
      console.log('Verification Email sent');
    }, err =>{
      console.log('Unable to send email', err);
      
    })
  }

  

  

  


  

}
