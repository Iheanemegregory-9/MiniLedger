import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { IncomeService } from 'src/app/shared/income.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [MessageService]
})
export class IncomeComponent implements OnInit {

  public pageSettings?:PageSettingsModel;
  public filterOptions?: FilterSettingsModel;
  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];

  constructor(private incomeService: IncomeService, private activatedRoute: ActivatedRoute, private authService : AuthService, private auth: Auth, private messageService: MessageService){

  }

  description!:string;
  source!:string;
  price!:number;  
  date!:Date;
  loading:boolean = true;
  tableItem!:any[]
  addNewIncomeDialog: boolean = false;
  editNewIncomeDialog: boolean = false;
  itemID!:any;
  firstName!:any;
  userID:any;
  userDetails: any = {};
  isVerified!:boolean;
  email:any;
  dataDetails:any;
  btnText = 'Add'


  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid
        this.email = user?.email
        console.log(user.uid);
        this.getUserDetails(this.userID)
        this.isEmailVerified()
      }
      else{
        console.log('no user');
      }

      this.getUserIncome(this.userID)
    })

  }

  show(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: ' your new income has been added' })
  }
  

  openNew() {
    this.addNewIncomeDialog = true;
  }

hideDialog() {
  this.addNewIncomeDialog = false;
}
hideEditDialog(){
  this.editNewIncomeDialog = false
}



  addNewUserIncome(description:string, source:string, price:number, date:any, id:string){
    this.loading = true
    this.btnText = 'adding new expense'
    this.incomeService.setUserIncome(description, source, price, date, id).then(res =>{
      console.log(res);
      console.log('User income data added:' +  description, source, price, date); 
      this.show()
      this.loading = false
      this.btnText = 'Add'
      this.addNewIncomeDialog = false
    }, err =>{
      console.log(err);
    })
  }

  getUserIncome(id:string){
    this.incomeService.getUserIncome(id).subscribe(res =>{
      this.tableItem = res;
      this.loading = false;
      console.log(res)
    }, err =>{
      console.log(err); 
      
    })
  }

  openEditDialog(userId:string, itemID:string){
    this.editNewIncomeDialog = true;
    this.activatedRoute.paramMap.subscribe(param =>{
      this.itemID = param.get('id')
      this.incomeService.getUserIncomeById(userId, itemID).then(res=>{
        this.dataDetails = res.data()
        this.description = this.dataDetails.description;
        this.source = this.dataDetails.source;
        this.price = this.dataDetails.price;
        this.date = this.dataDetails.date.toDate();
        this.itemID = itemID
      }, err =>{
        console.log(err.message);
      })
    })
  }

  
  updateUserIncome(description:string, source:string, price:number, date:any, userId:string, incomeId:string ){
    console.log('Calling update income with userid:', this.userID, 'and the income id is:', incomeId );
    this.incomeService.editUserIncome(description, source, price, date, userId, incomeId).then(res=>{
      this.loading = true
      this.hideEditDialog()
    }, err =>{
      console.log(err.message);
    })
  }



  deleteUserIncome(userId:string, incomeId:string){
    this.incomeService.deleteUerIncome(userId, incomeId).then(err =>{
      console.log('Income has been deleted');
    }, err => {
      console.log(err.message);
      
    })
  }

  
  loadIncomeByID(id:string){
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemID = params.get('id');
     this.incomeService.getIncomeID(id).then((res)=>{
      this.dataDetails = res.data();
      console.log(this.dataDetails);
     })
   });
  }


  getUserDetails(id:string) {
    this.auth.onAuthStateChanged((user) => {
      if(user){
        this.userID = user.uid
        console.log(user.uid);  
        this.incomeService.getUserData(id).then(res =>{
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
    const verified = this.auth.currentUser?.emailVerified
    console.log(verified);
    
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
