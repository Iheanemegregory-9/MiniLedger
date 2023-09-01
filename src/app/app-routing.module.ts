import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardHomeComponent } from './dashboard/home/home.component';
import { IncomeComponent } from './dashboard/income/income.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { guardGuard } from './guard/guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardHomeComponent, canActivate: [guardGuard]},
  {path: 'income', component: IncomeComponent, canActivate: [guardGuard]},
  {path: 'expenses', component: ExpensesComponent, canActivate: [guardGuard]},
  {path: 'comming-soon', component: ComingSoonComponent},
  {path: 'reset-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
