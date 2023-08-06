import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeComponentsModule } from './prime-components/prime-components.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { IncomeComponent } from './dashboard/income/income.component';
import { ExpensesComponent } from './dashboard/expenses/expenses.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DataDetailsComponent } from './data-details/data-details.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { GridModule, FilterService, PagerModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    IncomeComponent,
    ExpensesComponent,
    ContactComponent,
    HeaderComponent,
    ComingSoonComponent,
    VerifyEmailComponent,
    DataDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeComponentsModule,
    FormsModule,
    AgGridModule,
    GridModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    PagerModule
  ],
  providers: [FilterService, EditService, ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
