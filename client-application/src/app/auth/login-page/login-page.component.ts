import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/entitites/user-login.model';
import { LoginService } from 'src/app/services/login.service';
import { AuthorityService } from '../authority.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'fixtab-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  user: UserLogin = new UserLogin();
  token: any | null = null;

  constructor(
    private loginService: LoginService,
    private authorityService: AuthorityService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginService.login(this.user).subscribe(
      // (res: HttpResponse<string>) => {
      //   this.token = res.body;
      //   this.authorityService.setToken(this.token['accessToken'], this.token['expirationDate']);
      //   window.location.reload();
      // }
      {
        next: (res) => {
          this.token = res.body;
          this.authorityService.setToken(this.token['accessToken'], this.token['expirationDate']);
          window.location.reload();
        },
        error: () => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd',
              detail: 'Wystąpił błąd podczas zmiany hasła!'});
        }
      }
    )
  }

}
