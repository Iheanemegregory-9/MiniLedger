import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {


  dataDetails!: any;
  itemID!:any


  constructor(private activatedRoute: ActivatedRoute, private sharedService : ServiceService, private route: Router){}

  

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => {
     this.itemID = params.get('id');
    this.sharedService.getExpensesID(this.itemID).then((res)=>{

      this.dataDetails = res.data();
      console.log(res.data());
      
    })
  });
}

}
