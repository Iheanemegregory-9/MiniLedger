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

  data:any;
  dataId:any;

  

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((param)=>{
    this.dataId = param.get('id');
    this.data = this.sharedService.tableItem.find(x => x.id == this.dataId);
  })
  

  }

  updateData(){
    this.route.navigate(['/expenses'])
  }


}
