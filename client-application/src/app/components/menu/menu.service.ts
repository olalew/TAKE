import { Injectable } from '@angular/core';
import { IMenuItem } from 'src/app/entitites/menu-item.model';
import { Authority } from '../../auth/authority.model';

@Injectable({providedIn: 'root'})
export class MenuService {

  constructor() { }

  getMenuItems(): IMenuItem[] {
    const items: IMenuItem[] = [
      //this.createMenuItem('fa fa-home', 'Główna', '/', []),
      this.createMenuItem('fa fa-bus', 'Autobusy', 'bus', []),
      this.createMenuItem('fa fa-users', 'Klienci', 'clients', []),
      this.createMenuItem('fa fa-location-arrow', 'Trasy', 'route', []),
      this.createMenuItem('fa fa-suitcase', 'Przewozy', 'travel', [])
    ];
    return items;
  }

  private createMenuItem(icon: string | null, label: string, routerLink: string, auth: string[], additionalOptions?: any): IMenuItem {
    const menuItem = {
        icon: icon ? icon : '',
        label: label,
        routerLink,
        title: label,
        auth
    };
    Object.assign(menuItem, additionalOptions);
    return menuItem;
}

}
