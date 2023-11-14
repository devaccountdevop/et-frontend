import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss'],
})
export class ClientUpdateComponent  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close(false); // Close the dialog and send 'false' result
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Close the dialog and send 'true' result
  }


}
