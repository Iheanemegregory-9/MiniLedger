import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { GalleriaModule } from 'primeng/galleria';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    RippleModule,
    CarouselModule,
    InputTextModule,
    CardModule,
    MessagesModule,
    ToastModule,
    GalleriaModule,
    MenubarModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    DynamicDialogModule
  ],
  exports:[
    ButtonModule,
    TableModule,
    InputNumberModule,
    TooltipModule,
    RippleModule,
    CarouselModule,
    CalendarModule,
    InputTextModule,
    CardModule,
    MessagesModule,
    ToastModule,
    GalleriaModule,
    MenubarModule,
    AccordionModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    DynamicDialogModule
  ]
})
export class PrimeComponentsModule { }
