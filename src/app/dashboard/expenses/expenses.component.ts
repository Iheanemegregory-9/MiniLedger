import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from 'src/app/shared/service.service';



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

  tableItem!:Observable<any>



  visible: boolean = false;
  data:any;
  dataId:any;


  constructor(private route: Router, private service: ServiceService, private activatedRoute: ActivatedRoute){ }

 
  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.dataId = param.get('id');
      this.data = this.service.getExpenses();
    })


    this.getExpenses()
    
  }

  cols:any[] = [
    // {field: 's/n', header: 'S/N'},
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price' },
    { field: 'date', header: 'Date' },
  ]



  edit(){
    this.route.navigate(['/edit/{{id}}'])
  }


  openForm(){
    this.visible = true;
  }
  
  adddNewExpence(description:string, category:any, price:number, date:Date){
    this.loading = true
    this.service.createNewExpense(description, category, price, date).then((res)=>{
      this.visible = false;
      console.log(res);  
    }, err =>{
      console.log(err);
      
    })
  }

  getExpenses(){
    this.service.getExpenses().subscribe((res)=>{
      console.log(res);
      this.tableItem = this.service.expneses
    })
  }

  

  

  


  

}
