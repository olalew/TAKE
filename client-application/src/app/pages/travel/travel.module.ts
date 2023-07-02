import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from 'src/app/components/components.module';
import { TravelComponent } from './travel.component';
import { TravelRoutingModule } from './travel-routing.module';
import { TravelDialogComponent } from './travel-dialog/travel-dialog.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    TravelRoutingModule,
    ComponentsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    CalendarModule
  ],
  exports: [
    TravelComponent,
    TravelDialogComponent
  ],
  declarations: [
    TravelComponent,
    TravelDialogComponent
  ],
  providers: [],
})
export class TravelModule { }
