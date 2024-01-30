import { Component, Inject, Input, OnInit, DoCheck } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
import { AddClientService } from "src/app/services/homepageServices/add-client.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.scss"],
})
export class TaskModalComponent implements OnInit {
  clientName: string = "";
  jiraUserName: string = "";
  token: string = "";
  message = "";
  estimatesForm!: FormGroup;
  showFetchError: boolean = false;
  formSubmitted = false;

  // sharedItem: any;
  private dataSubscription: Subscription | undefined;

  sharedItem: any = { low: "", realistic: "", high: "" };
  constructor(
    private alertController: AlertController,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private commonService: CommanLoaderService,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.estimatesForm = this.fb.group({
      low: new FormControl("", [Validators.required, Validators.min(1)]),
      realistic: new FormControl("", [Validators.required, Validators.min(1)]),
      high: new FormControl("", [Validators.required, Validators.min(1)]),
    });
    this.dataSubscription = this.taskService.sharedItem$.subscribe((item) => {
      this.sharedItem = item;
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  saveEstimatesInDB() {
    this.formSubmitted = true;
    if (!this.estimatesForm.valid) return;
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
  }
  fetchAiEstimates() {
    this.formSubmitted = true;
    if (!this.estimatesForm.valid) return;
    const requestData = {
      value: this.sharedItem,
    };
    this.taskService.fetchAiEstimates(requestData).subscribe((res) => {
      if (res.code === 200) {
        this.sharedItem.aiEstimate = res.data.aiEstimate;
        this.sharedItem.threePointEstimate = res.data.threePointEstimate;
        this.sharedItem.riskFactor = res.data.riskFactor;
      }
    });
  }

  updateAiEstimate() {
    this.formSubmitted = true;
    if (!this.estimatesForm.valid) return;
    if (this.sharedItem.aiEstimate == null) {
      this.showFetchError = true; // Set the error state

      // Automatically hide the error after 5 seconds
      setTimeout(() => {
        this.showFetchError = false;
      }, 3000);
    } else {
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
    }
  }

  ngOnDestroy() {
    this.taskService.updateItem(this.sharedItem);
    this.dataSubscription?.unsubscribe();
  }
  clearEstimate(field: string) {
    this.sharedItem.estimates[field] = "";
  }
}
