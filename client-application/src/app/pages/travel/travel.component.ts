import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/api';

import { TravelService } from './../../services/travel.service';
import { TravelDialogComponent } from './travel-dialog/travel-dialog.component';
import { Travel } from 'src/app/entitites/travel.model';
import { UniversalTableColumn } from 'src/app/components/table/column.model';
import { ClientsService } from 'src/app/services/clients.service';
import { Client, LocalClient } from 'src/app/entitites/client.model';

@Component({
  selector: 'take-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {
  selectedTravel: Travel | null = null;
  columns: UniversalTableColumn[] = [];
  travels: Travel[] = [];
  clients: LocalClient[] = [];
  selectedClient: LocalClient | null = null;
  openDeleteDialog = false;

  clientsLoaded: boolean = false

  constructor(
    private dialogService: DialogService,
    private routeService: TravelService,
    private messageService: MessageService,
    private clientService: ClientsService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadColumns();
    this.loadTravels();
    this.loadClients();
  }

  loadColumns(): void {
    this.columns = [
      {
        header: 'Nazwa',
        field: 'name'
      },
      {
        header: 'Data',
        field: 'date'
      },
      {
        header: 'Trasa',
        field: 'route',
        subField: 'name'
      }
    ];
  }

  loadTravels(): void {
    this.routeService.getAll().subscribe(
      (res: HttpResponse<Travel[]>) => {
        this.zone.run(() => {
          this.travels = res.body ?? [];
        });
      }
    );
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(
      (res: HttpResponse<LocalClient[]>) => {
        res.body?.forEach(client => {
          client.name = `${client.firstName} ${client.lastName}`;
        });
        this.clients = res.body ?? [];
        this.selectedClient = null;
        this.clientsLoaded = true;

        console.log('clients ... ', this.clients);

        this.cdr.detectChanges();
      }
    );
  }

  loadTravelForClient(): void {

    console.log('client ...', this.selectedClient);
    if (!!this.selectedClient?.id && this.selectedClient!.id! > 0)
      this.routeService.getForClient(this.selectedClient!.id!).subscribe(
        (res: HttpResponse<Travel[]>) => {
          this.travels = res.body ?? [];
        }
      );
  }

  onTravelSelected(event: Travel): void {
    this.selectedTravel = event;
  }

  openTravelDialog(edit: boolean): void {
    const ref = this.dialogService.open(TravelDialogComponent, {
      header: edit ? 'Edytuj przewóz' : 'Dodaj przewóz',
      width: '60%',
      height: '60%',
      data: {
        edit: edit,
        travel: this.selectedTravel
      }
    });
    ref.onClose.subscribe((response) => this.handleTravelDialog(response));
  }

  openTravelDeleteDialog(event: boolean): void {
    this.openDeleteDialog = event;
  }

  handleTravelDeleteDialog(response: boolean): void {
    if (response) {
      this.routeService.delete(this.selectedTravel?.id!).subscribe({
        next: () => {
          this.messageService.add({
            key: 'mainToast',
            severity: 'success',
            summary: 'Sukces!',
            detail: 'Pomyślnie usunięto przewóz!'
          });
          this.loadTravels();
        },
        error: () => {
          this.messageService.add({
            key: 'mainToast',
            severity: 'error',
            summary: 'Błąd!',
            detail: 'Nie udało się usunąć przewozu!'
          });
        }
      });
    }
    this.openDeleteDialog = false;
  }

  handleTravelDialog(response: any) {
    if (response) {
      this.loadTravels();
    }
  }
}
