import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';
import { MainComponent } from './main.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    ComponentsModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule
  ],
  exports: [
    MainComponent,
  ],
  declarations: [
    MainComponent
  ],
  providers: [],
})
export class MainModule { }
