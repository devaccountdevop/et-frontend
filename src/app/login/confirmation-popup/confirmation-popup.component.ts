import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent  implements OnInit {

  constructor(private loginService:LoginService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    
  }

  close(){
    this.dialog.closeAll();
  }
}
