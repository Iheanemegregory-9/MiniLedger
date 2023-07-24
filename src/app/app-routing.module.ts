import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { IncomeComponent } from './dashboard/income/income.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DataDetailsComponent } from './data-details/data-details.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: HomeComponent},
  {path: 'income', component: IncomeComponent},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'comming-soon', component: ComingSoonComponent},
  {path: 'verify', component: VerifyEmailComponent},
  {path: 'edit/:id', component: DataDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
