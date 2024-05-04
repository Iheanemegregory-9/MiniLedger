import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../layouts/side-bar/side-bar.component';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {

}
