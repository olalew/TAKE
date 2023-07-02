import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'fixtab-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  arrowLeft = faArrowLeft;
  arrowRight = faArrowRight;
  isMenuHide = false;
  isMenuHideAnimation = false;

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit() {

  }

  onMenuHide(param: boolean): void {
    this.isMenuHideAnimation = param;
    setTimeout(()=>{
      this.isMenuHide = param;
    }, param ? 200 : 100);
  }

  onLogoff(): void {
    window.sessionStorage.setItem('accessToken', '');
    window.sessionStorage.setItem('expirationDate', '');
    window.location.reload();
  }
}
