import { L10n } from '@syncfusion/ej2-base';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import {DataManager, UrlAdaptor} from '@syncfusion/ej2-data'



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  public pageSettings?:PageSettingsModel;
  public filterOptions?: FilterSettingsModel;
  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];
  public dataSource!: DataManager;


  
  rangeValue = 10;

  description!:string;
  category!:string
  price!:number  
  date:Date = new Date();
  loading:boolean = false

  tableItem!:any[]



  visible: boolean = false;
  data:any;
  dataId!:string | null;


  constructor(
    private route: Router, 
    private service: ServiceService, 
    private activatedRoute: ActivatedRoute
    ){ }

 
  ngOnInit(): void {

    console.log(this.rangeValue);
    
    this.getExpenses()
    this.pageSettings = {
      pageSize: 5
    }

    this.filterOptions = {
      ignoreAccent: true
    }

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

    this.activatedRoute.paramMap.subscribe(id=>{
      this.dataId = id.get('id')
    })

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

    this.loading = false;
  }

  getExpenses(){
    this.service.getExpenses().subscribe((res)=>{
      console.log(res);
      this.tableItem = res;
    })
  }

  

  

  


  

}
