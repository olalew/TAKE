import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/entitites/menu-item.model';
import { MenuService } from './menu.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'fixtab-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: IMenuItem[] = [];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.items = this.menuService.getMenuItems();
  }

}
