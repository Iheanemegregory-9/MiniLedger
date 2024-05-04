import { Component } from '@angular/core';
import { SideBarComponent } from '../../layouts/side-bar/side-bar.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [SideBarComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
