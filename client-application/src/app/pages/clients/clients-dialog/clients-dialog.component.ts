import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address } from 'src/app/entitites/address.model';
import { Client } from 'src/app/entitites/client.model';
import { ChangeDateService } from 'src/app/services/change-date.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'fixtab-clients-dialog',
  templateUrl: './clients-dialog.component.html'
})

export class ClientsDialogComponent implements OnInit {

  clientForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDay: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{11}")]],
    pesel: ['', Validators.required]
  });

  client: Client = new Client();
  address: Address = new Address();
  clientBirthDate: Date = new Date();
  edit = false;

  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientService: ClientsService,
    private messageService: MessageService,
    private changeDateService: ChangeDateService
  ) { }

  ngOnInit() {
    this.edit = this.config.data.edit;
    if(this.edit) {
      this.client = this.config.data.client;
      this.clientBirthDate = new Date(this.client.birthDate!);
    }
  }

  onEditClient(): void {
    this.client.birthDate = this.changeDateService.changeDateToString(this.clientBirthDate!);
    this.clientService.update(this.client).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Sukces!',
                detail: 'Pomyślnie edytowano klienta!'});
          this.ref.close(true);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd!',
                detail: 'Edycja klienta nie powiodła się!'});
        }
      }
    )
  }

  onCreateClient(): void {
    this.client.birthDate = this.changeDateService.changeDateToString(this.clientBirthDate!);
    this.clientService.create(this.client).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Sukces!',
                detail: 'Pomyślnie dodano klienta!'});
          this.ref.close(true);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd!',
                detail: 'Dodanie klienta nie powiodło się!'});
        }
      }
    )
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
