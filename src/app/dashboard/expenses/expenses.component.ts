import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ExpenseService } from 'src/app/shared/expense.service';
import { Auth } from '@angular/fire/auth';
import { Message, MessageService, ConfirmationService  } from 'primeng/api';




@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ExpensesComponent implements OnInit {

  description!:string;
  category!:string
  price!:number  
  date!:Date
  itemID!:any;
  formatedDate!:Date
  loading:boolean = true;
  tableItem!:any[];
  firstName!:any;
  isVerified = true; 
  userID:any; 
  productDialog: boolean = false;
  editExpenseDialog: boolean = false;

  btnText = 'Add'

  userDetails: any = {};
  dataDetails:any;


  constructor(
    private route: Router, 
    private expenseService: ExpenseService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private auth: Auth,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){ }

 
  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid
        console.log(user.uid);
        this.isEmailVerified()
        this.getUserDetails(this.userID) 
        this.getUserExpenses(this.userID)
      }
      else{
        console.log('no user');
      }
    })
    this.isEmailVerified()
  }


  show(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'your new expense has been added' })
  }

  openNew() {
    this.productDialog = true;
}

hideDialog() {
  this.productDialog = false;
}
hideEditDialog(){
  this.editExpenseDialog = false
}
  
  addNewUserExpense(description:string, category:string, price:number, date:any, id:string){
    this.loading = true
    this.btnText = 'adding new expense'
    this.expenseService.setUserExpense(description, category, price, date, id).then(res =>{
      console.log(res);
      console.log('User income data added:' +  description, category, price, date); 
      this.loading = false
      this.hideDialog()
      this.btnText = 'Add'
    }, err =>{
      console.log(err);
    })
  }

  getUserExpenses(id:string){
    this.expenseService.getUserExpense(id).subscribe(res =>{
      this.tableItem = res;
      this.loading = false
    }, err =>{
      console.log(err);
    })
  }


  openEditDialog(userId:string, itemID:string){
    this.editExpenseDialog = true;
    this.activatedRoute.paramMap.subscribe(param =>{
      this.itemID = param.get('id')
     this.expenseService.getUserExpenseById(userId, itemID).then(res =>{
      this.dataDetails = res.data()
        this.description = this.dataDetails.description;
        this.category = this.dataDetails.category;
        this.price = this.dataDetails.price;
        this.date = this.dataDetails.date.toDate();
        this.itemID = itemID
     }, err =>{
      console.log(err.message);
     })
     
    })
  }

  updateUserExpense(description:string, category:string, price:number, date:any, userId:string, incomeId:string ){
    console.log('Calling update income with userid:', this.userID, 'and the income id is:', incomeId );
    this.expenseService.editUserIncome(description, category, price, date, userId, incomeId).then(res=>{

      console.log(res);
      
      this.loading = true
      this.hideEditDialog()
    }, err =>{
      console.log(err.message);
    })
  }

  deleteUserIncome(userId:string, expenseId:string){
    this.expenseService.deleteUerExpense(userId, expenseId).then(err =>{
      console.log('Expense has been deleted');
    }, err => {
      console.log(err.message);
      
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
