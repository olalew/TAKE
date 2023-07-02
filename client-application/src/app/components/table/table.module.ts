import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    TranslateModule,
    TooltipModule,
    DialogModule,
    FontAwesomeModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [TableComponent],
  providers: [],
})
export class FixtabTableModule { }
