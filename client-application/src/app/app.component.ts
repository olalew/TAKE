import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { AuthorityService } from './auth/authority.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-app';
  isAuthorized = true;

  constructor(
    private authorityService: AuthorityService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
      //this.isAuthorized = this.authorityService.getUserAuthenticate();
      this.translateService.setDefaultLang('pl');
      this.translateService.use('pl');
  }
}
