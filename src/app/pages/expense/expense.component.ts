import { Component } from '@angular/core';
import { SideBarComponent } from '../../layouts/side-bar/side-bar.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    SideBarComponent 
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {

}
