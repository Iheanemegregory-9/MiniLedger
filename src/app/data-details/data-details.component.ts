import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css'],
  providers: [DialogService, MessageService]
})
export class DataDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private sharedService : ServiceService, private route: Router){}

  

  

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param)=>{
    
    console.log(param);
    
  })
  

  }

  updateData(){
    this.route.navigate(['/expenses'])
  }


}
