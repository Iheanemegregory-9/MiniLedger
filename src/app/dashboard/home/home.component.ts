import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardHomeComponent {

  constructor() {}

  images: any[] = [
    {
      message: `Advanced Expense Management Book`,
      alt: 'Image 1',
      title: 'Image 1'
    },
    {
      message: `Advanced Income Management Book`,
      alt: 'Image 1',
      title: 'Image 1'
    },
    {
      message: `Advanced Invoic Management Book`,
      alt: 'Image 1',
      title: 'Image 1'
    },
    
  ];

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    ngOnInit() {
      
  }


}