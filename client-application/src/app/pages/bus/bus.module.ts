import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ComponentsModule } from 'src/app/components/components.module';
import { BussDialogComponent } from './buses-dialog/bus-dialog.component';
import { EmployeesRoutingModule } from './bus-routing.module';
import { BusComponent } from './bus.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  imports: [
    EmployeesRoutingModule,
    ComponentsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule
  ],
  exports: [
    BusComponent,
    BussDialogComponent
  ],
  declarations: [
    BusComponent,
    BussDialogComponent
  ],
  providers: [],
})
export class BusModule { }
