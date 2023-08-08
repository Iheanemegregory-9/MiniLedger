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

  constructor(private incomeService: IncomeService, private activatedRoute: ActivatedRoute){

  }

  description!:string;
  source!:string;
  price!:number;  
  date:Date = new Date();
  loading:boolean = false
  tableItem!:any[]
  visible: boolean = false;
  itemID!:any;
  editIsHidden = true;

  dataDetails:any;


  ngOnInit(): void {
    
    this.loadIncomeData()
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

  loadIncomeData(){
    this.incomeService.getIncomeData().subscribe((res)=>{
      this.tableItem = res;
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

   this.editIsHidden = false;
  }


}
