import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeService } from 'src/app/shared/income.service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  dataDetails!: any;
  itemID!:any
  description!:string;
  source!:string;
  price!:number;
  date:Date = new Date()

  constructor(private activatedRoute: ActivatedRoute, private sharedService: IncomeService, private route: Router){}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
       this.itemID = params.get('id');
      this.sharedService.getIncomeID(this.itemID).then((res)=>{
        this.dataDetails = res.data();
        console.log(res.data());
      })
    });
  }


  updateData(description:string, source: string, price:number, date:Date, id:string){
    this.sharedService.updateIncome(description, source, price, date, id).then(()=>{
      this.description = description;
      this.source = source;
      this.price = price;
      this.date = date;


    }, err=>{
      console.log(err);
      
    })

    this.route.navigate(['/income'])
  }

}
