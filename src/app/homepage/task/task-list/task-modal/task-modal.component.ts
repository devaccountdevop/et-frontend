import { Component, Inject, Input, OnInit,DoCheck, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommanLoaderService } from 'src/app/services/comman-loader.service';
import { AddClientService } from 'src/app/services/homepageServices/add-client.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent  implements OnInit {

  clientName: string = "";
  jiraUserName: string = "";
  token: string = "";

  // sharedItem: any;
  private dataSubscription: Subscription | undefined;

  sharedItem: any = { lowEstimate: '', realisticEstimate: '', highEstimate: '' };
  constructor( private alertController: AlertController,
    private dialog: MatDialog,
    private addClientService: AddClientService,
    private alertService: CommanLoaderService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.dataSubscription = this.taskService.sharedItem$.subscribe((item) => {
      this.sharedItem = item;
    });
  }

  showField:boolean = false;
  showTime: boolean = false;

  toggleShowTime() {
    this.showTime = !this.showTime;
  }
  toggleShowField() {
    this.showField = !this.showField;
  }

  closeDialog() {
    this.dialog.closeAll();
    this.clientName = "";
    this.jiraUserName = "";
    this.token = "";
  }

  updateData(){
    console.log(this.sharedItem.lowEstimate, this.sharedItem.realisticEstimate, this.sharedItem.highEstimate);
    
  }
  ngOnDestroy() {
    this.taskService.updateItem(this.sharedItem);
    this.dataSubscription?.unsubscribe();
  }
}
