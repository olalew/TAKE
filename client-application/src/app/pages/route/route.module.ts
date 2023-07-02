import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from 'src/app/components/components.module';
import { RoutesComponent } from './route.component';
import { RouteRoutingModule } from './route-routing.module';
import { RouteDialogComponent } from './route-dialog/route-dialog.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  imports: [
    RouteRoutingModule,
    ComponentsModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [
    RoutesComponent,
    RouteDialogComponent
  ],
  declarations: [
    RoutesComponent,
    RouteDialogComponent
  ],
  providers: [],
})
export class RoutesModule { }
