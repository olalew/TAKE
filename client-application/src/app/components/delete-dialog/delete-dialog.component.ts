import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'fixtab-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})

export class DeleteDialogComponent implements OnInit {

  @Output() deleteConfirmationEmit = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.openDeleteDialog();
  }

  openDeleteDialog(): void {
    this.confirmationService.confirm({
      key: 'confirmDeleteDialog',
      header: 'Usuń',
      message: 'Czy na pewno chcesz usunąć element?',
      accept: () => this.handleDeleteDialogResponse(true),
      reject: () => this.handleDeleteDialogResponse(false)
    });
  }

  handleDeleteDialogResponse(accept: boolean): void {
    if(accept) {
      this.deleteConfirmationEmit.emit(true);
    } else {
      this.deleteConfirmationEmit.emit(false);
    }
  }
}
