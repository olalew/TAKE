import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FixtabTableModule } from './table/table.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableButtonsComponent } from './table-buttons/table-buttons.component';
import { ButtonModule } from 'primeng/button';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MenuComponent,
    TableButtonsComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    FontAwesomeModule,
    ButtonModule,
    ConfirmDialogModule,
    TranslateModule
  ],
  exports: [
    MenuComponent,
    FixtabTableModule,
    TableButtonsComponent,
    DeleteDialogComponent
  ]
})
export class ComponentsModule { }
