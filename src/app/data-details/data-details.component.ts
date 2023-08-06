import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceService } from '../shared/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css'],
  providers: [DialogService, MessageService]
})
export class DataDetailsComponent implements OnInit {


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

    // console.log(this.dataDetails);
    
  });
}

}
