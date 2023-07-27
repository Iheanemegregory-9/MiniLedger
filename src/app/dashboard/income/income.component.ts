import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { IncomeService } from 'src/app/shared/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  public pageSettings?:PageSettingsModel;
  public filterOptions?: FilterSettingsModel;
  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];

  constructor(private incomeService: IncomeService){

  }

  description!:string;
  source!:string;
  price!:number;  
  date:Date = new Date();
  loading:boolean = false

  tableItem!:any[]

  visible: boolean = false;
  id!:string;


  ngOnInit(): void {
    this.loadIncomeData(this.id)
  }


  openForm(){
    this.visible = true;
  }

  addNewIncome(description:string, source:any, price:number, date:Date){
    this.loading = true
    this.incomeService.addNewIncome(description, source, price, date).then((res)=>{
      console.log(res);
      console.log('data added');
      this.visible = false
      
    }, err =>{
      console.log(err);
      
    })
    this.loading = false
  }

  loadIncomeData(id:string){

    this.incomeService.getIncomeData(id).subscribe((res)=>{
      console.log(res);
      console.log(id);
      
      this.tableItem = res;
      // this.id = id;
      
    })

  }


}
