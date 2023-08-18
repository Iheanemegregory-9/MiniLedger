import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ExpenseService } from 'src/app/shared/expense.service';
import { Auth } from '@angular/fire/auth';



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  description!:string;
  category!:string
  price!:number  
  date:Date = new Date();
  loading:boolean = false
  tableItem!:any[]

  isVerified = true; 
  userID:any; 

  userDetails: any = {};
  dataDetails:any;

  visible: boolean = false;
  data:any;


  constructor(
    private route: Router, 
    private expenseService: ExpenseService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private auth: Auth
    ){ }

 
  ngOnInit(): void {

    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid
        console.log(user.uid);
        this.getUserDetails(this.userID) 
      }
      else{
        console.log('no user');
      }
    })

    this.isEmailVerified()

  }

  openForm(){
    this.visible = true;
  }
  
  adddNewExpence(description:string, category:any, price:number, date:Date){
    this.loading = true
    this.expenseService.createNewExpense(description, category, price, date).then((res)=>{
      this.visible = false;
      console.log(res);  
    }, err =>{
      console.log(err);
    })

    this.loading = false;
  }

  getExpenses(){
    this.expenseService.getExpenses().subscribe((res)=>{
      console.log(res);
      this.tableItem = res;
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

  

  

  


  

}
