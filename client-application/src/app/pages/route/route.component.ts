import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UniversalTableColumn } from 'src/app/components/table/column.model';
import { RouteDialogComponent } from './route-dialog/route-dialog.component';
import { TravelRoute } from 'src/app/entitites/travel-route.model';
import { RouteService } from 'src/app/services/route.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'fixtab-route',
  templateUrl: './route.component.html'
})

export class RoutesComponent implements OnInit {

  selectedRoute: TravelRoute | null = null;
  columns: UniversalTableColumn[] = [];
  routes: TravelRoute[] = [];
  openDeleteDialog = false;

  constructor(
    private dialogService: DialogService,
    private routeService: RouteService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadColumns();
    this.loadRoutes();
  }

  loadColumns(): void {
    this.columns = [
      {
        header: 'Nazwa',
        field: 'name'
      },
      {
        header: 'Punkt początkowy',
        field: 'startingPoint'
      },
      {
        header: 'Punkt docelowy',
        field: 'endPoint'
      },
      {
        header: 'Odległość',
        field: 'distance'
      }
    ];
  }

  loadRoutes(): void {
    this.routeService.getAll().subscribe(
      (res: HttpResponse<TravelRoute[]>) => {
        this.routes = res.body ?? [];
      }
    )
  }

  onRouteSelected(event: TravelRoute): void {
    this.selectedRoute = event;
  }

  openRouteDialog(edit: boolean): void {
    const ref = this.dialogService.open(RouteDialogComponent, {
      header: edit ? 'Edytuj trase' : 'Dodaj trase',
      width: '60%',
      height: '60%',
      data: {
        edit: edit,
        route: this.selectedRoute
      }
    });
    ref.onClose.subscribe((response) => this.handleRouteDialog(response));
  }

  openRouteDeleteDialog(event: boolean): void {
    this.openDeleteDialog = event;
  }

  handleRouteDeleteDialog(response: boolean): void {
    if(response) {
      this.routeService.delete(this.selectedRoute?.id!).subscribe(
        {
          next: () => {
            this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
              detail: 'Pomyślnie usunięto trasę!'});
            this.loadRoutes();
          },
          error: () => {
            this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Error',
             detail: 'Nie udało sie usunąć trasy!'});
          }
        }
      )
    }
    this.openDeleteDialog = false;
 }

  handleRouteDialog(response: any) {
    if(response) {
      this.loadRoutes();
    }
  }
}
