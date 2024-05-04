import { Routes } from '@angular/router';
import { IncomeComponent } from './pages/income/income.component';
import { DefaultComponent } from './pages/default/default.component';
import { RegisterComponent } from './layouts/register/register.component';
import { LoginComponent } from './layouts/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { OverviewComponent } from './pages/overview/overview.component';

export const routes: Routes = [

    {
        path: '',
        component: DefaultComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'income',
        component: IncomeComponent
    },
    {
        path: 'expense',
        component: ExpenseComponent
    },
    {
        path: 'dashboard',
        component: OverviewComponent,
    }
];
