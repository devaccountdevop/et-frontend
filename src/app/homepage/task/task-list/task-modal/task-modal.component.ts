import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { AddClientService } from 'src/app/services/homepageServices/add-client.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent  implements OnInit {


  clientName: string = "";
  jiraUserName: string = "";
  token: string = "";
  constructor( private alertController: AlertController,
    private dialog: MatDialog,
    private addClientService: AddClientService,
    private alertService: CommanLoaderService) { }

  ngOnInit() {}

  closeDialog() {
    this.dialog.closeAll();
    this.clientName = "";
    this.jiraUserName = "";
    this.token = "";
  }

}
