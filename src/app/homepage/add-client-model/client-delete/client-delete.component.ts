import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.scss'],
})
export class ClientDeleteComponent  implements OnInit {
 

  constructor(
    public dialogRef: MatDialogRef<ClientDeleteComponent>,
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
