import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';



@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {


  visible = false;
  data:any;
  dataId:any;
  // cols!:any[];
  tableItem!:any[];
  id!:string;



  


  constructor(private route: Router, private service: ServiceService, private activatedRoute: ActivatedRoute){ }


  ngOnInit(): void {

    this.tableItem = this.service.tableItem
    
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.dataId = param.get('id');
      this.data = this.service.tableItem.find(x => x.id == this.dataId);
    })
    
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

  

  

  


  

}
