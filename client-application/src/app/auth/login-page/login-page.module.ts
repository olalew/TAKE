import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './login-page.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    TranslateModule
  ],
  exports: [
    LoginPageComponent
  ],
  declarations: [
    LoginPageComponent
  ],
  providers: [],
})
export class LoginPageModule { }
