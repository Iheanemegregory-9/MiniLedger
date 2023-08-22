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
  date:Date = new Date();
  loading:boolean = true;
  tableItem!:any[]
  visible: boolean = false;
  itemID!:any;
  editIsHidden = true;
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
  

  openForm(){
    this.visible = true;
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
      this.visible = false
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

  // loadIncomeData(){
  //   this.incomeService.getIncomeData().subscribe((res)=>{
  //     this.tableItem = res;
  //     this.loading = false;
  //   })

  // }

  loadIncomeByID(id:string){
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemID = params.get('id');
     this.incomeService.getIncomeID(id).then((res)=>{
      this.dataDetails = res.data();
      console.log(this.dataDetails);
     })
   });

   this.editIsHidden = false;
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
