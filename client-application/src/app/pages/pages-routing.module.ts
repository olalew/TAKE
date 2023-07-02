import { authGuard } from './../config/user-route-access.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule.forChild(
      [
        {
          path: '',
          loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        },
        {
          path: '',
          loadChildren: () => import('./bus/bus.module').then(m => m.BusModule)
        },
        {
          path: '',
          loadChildren: () => import('./route/route.module').then(m => m.RoutesModule)
        },
        {
          path: '',
          loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
        },
        {
          path: '',
          loadChildren: () => import('./travel/travel.module').then(m => m.TravelModule)
        },
      ]
    )
  ]
})
export class PagesRoutingModule { }
