import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ComponentsModule } from 'src/app/components/components.module';
import { CalendarModule } from 'primeng/calendar';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';


@NgModule({
  imports: [
    ClientsRoutingModule,
    ComponentsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule
  ],
  exports: [ClientsComponent],
  declarations: [ClientsComponent, ClientsDialogComponent],
  providers: [],
})
export class ClientsModule { }
