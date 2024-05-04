import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncomeComponent } from '../../pages/income/income.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, DashboardComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent { 

}
