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
  message = "";
 
  // sharedItem: any;
  private dataSubscription: Subscription | undefined;
 
  sharedItem: any = { low: '', realistic: '', high: '' };
  constructor( private alertController: AlertController,
    private dialog: MatDialog,
    private addClientService: AddClientService,
    private commonService: CommanLoaderService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  ngOnInit() {
 
    this.dataSubscription = this.taskService.sharedItem$.subscribe((item) => {
      this.sharedItem = item;
    });
  }
  errormsg:boolean = true;
  showField:boolean = false;
  showTime: boolean = false;
 
  toggleShowTime() {
    this.showTime = !this.showTime;
  }
  toggleShowField() {
    this.showField = !this.showField;
  }
  hidemsg() {
    this.errormsg= false;
    this.message="";
  }
 
  closeDialog() {
    this.dialog.closeAll();
  }
 
  saveEstimatesInDB() {
    if(this.sharedItem &&
      this.sharedItem &&
      this.sharedItem.estimates.low !== 0 &&
      this.sharedItem.estimates.high !== 0 &&
      this.sharedItem.estimates.realistic !== 0
  )
{
    const requestData = {
      updateTask: this.sharedItem,
    };
 
    this.taskService.saveEstimatesInDB(requestData).subscribe((res) => {
        if (res.code === 200) {
          this.dialog.closeAll();
          this.commonService.presentToast(
            "Task details are saved successfully",
            3000,
            "toast-task-mess"
          );
        }
    });
  }else{
this.message = "input the required fields"   ;
 
  }
}
fetchAiEstimates(){
  if (
    this.sharedItem &&
    this.sharedItem.estimates.low != 0 && this.sharedItem.estimates.low != "" &&
    this.sharedItem.estimates.high != 0 && this.sharedItem.estimates.high != "" &&
    this.sharedItem.estimates.realistic != 0 && this.sharedItem.estimates.realistic != ""
  ){
  const requestData = {
    value: this.sharedItem,
  };
  this.taskService.fetchAiEstimates(requestData).subscribe((res) => {
      if (res.code === 200) {
        this.sharedItem.aiEstimate = res.data.aiEstimate;
       
      }
  });
  }else{
 
    this.message = "input the required fields";
 
}
 
}
 
updateAiEstimate(){
  if (
    this.sharedItem &&
    this.sharedItem.estimates.low !== 0 &&
    this.sharedItem.estimates.high !== 0 &&
    this.sharedItem.estimates.realistic !== 0
   
  ){
  const requestData = {
    updateTask: this.sharedItem,
  };
  this.taskService.updateEstimatesInJira(requestData).subscribe((res) => {
      if (res.code === 200) {
        this.dialog.closeAll();
          this.commonService.presentToast(
            "AI Estimate are updated successfully..",
            3000,
            "toast-task-mess"
          );
      }
  });
  }else{
 
    this.message = "input the required fields";
 
}
}
 
  ngOnDestroy() {
    this.taskService.updateItem(this.sharedItem);
    this.dataSubscription?.unsubscribe();
  }
  clearEstimate(field: string) {
    this.sharedItem.estimates[field] = '';
  }
}