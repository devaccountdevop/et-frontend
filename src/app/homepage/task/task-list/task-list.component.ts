import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { TaskService } from "src/app/services/task.service";
import { CommanLoaderService } from "src/app/services/comman-loader.service";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { TaskGraphComponent } from "../task-graph/task-graph.component";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  projectId:any;
  projectName:any;
  projectStartDate:any;
  projectEndDate:any;
  sprintId: any;
  sprintStartDate:any;
sprintEndDate:any;
  sprintName: any ;
  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  showContent = false;
  id: any = 45;
  clientId:any;
  editableFields = [
    "lowEstimate",
    "realisticEstimate",
    "highEstimate",
    "threePointEstimate",
    "aiEstimate",
    "actualHrs",
  ];

  // Pagination variables
  p: number = 1;
  searchText: any;
  selectedItem: any;
  editingItem: any = null;
  editingField: string = ""; 
  modifyItems: any[] = [];
  pageFilter = [
    { code: "6", name: "6" },
    { code: "12", name: "12" },
    { code: "18", name: "18" },
    { code: "24", name: "24" },
    { code: "30", name: "30" },
  ];
  pageFilterDefault: any = 6;
  sortedColumn: string = "title"; 
  isAscending: boolean = true;
  showPopup: boolean = false;
  tableData: any[] = [
 
  ];
  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService,
    private taskService: TaskService,
    private commanService: CommanLoaderService,
    private projectService:ProjectsService,
    private popover: PopoverController
    
  ) {

    this.router.queryParams.subscribe((params) => {
      this.projectId = params["projectId"];
      this.projectName = params["projectName"];
    });
  }

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.sprintId = params["sprintId"];
      this.sprintName = params["sprintName"];
      this.projectId = params["projectId"];
      this.clientId = params["clientId"];
      this.sprintStartDate= params["startDate"];
      this.sprintEndDate= params["endDate"];
      this.projectStartDate=  params["projectStartDate"]
      this.projectEndDate=  params["projectEndDate"]
    });
    if (this.sprintId !== 0) {
     this.getTaskBySprintId(this.sprintId,this.projectId);
    }
  }
  getTaskBySprintId(sprintId:any,projectId:any){
    this.taskService.getTaskBySprintId(sprintId,projectId).subscribe((res) => {
      this.tableData = res.data;
      // Convert original estimates in the tableData array from seconds to hours
      this.tableData.forEach((task) => {
        if (task.originalEstimate) {
          // Assuming 1 hour = 3600 seconds
          task.originalEstimate = task.originalEstimate / 3600;
        }
      });

    });
  }
  syncData(){
    let UserDetails = this.authService.getUserDetails();
    this.projectService.syncData(UserDetails?.id,this.clientId).subscribe((res)=>{
      if(this.sprintId&&this.projectId){
        this.getTaskBySprintId(this.sprintId,this.projectId);
       }else{
        this.router.queryParams.subscribe((params) => {
          this.sprintId = params["sprintId"];
          this.sprintName = params["sprintName"];
          this.projectId = params["projectId"];
          this.clientId = params["clientId"];
          this.sprintStartDate= params["startDate"];
          this.sprintEndDate= params["endDate"];
          this.projectStartDate=  params["projectStartDate"]
          this.projectEndDate=  params["projectEndDate"]
        });
        if(this.sprintId&&this.projectId){this.getTaskBySprintId(this.sprintId,this.projectId);}
       }
       if(res.code==200){this.commanService.presentToast("Sync is completed", 5000 , "toast-succuss-mess");}
       else{this.commanService.presentToast(res.data, 5000 , "toast-error-mess");}
    })
  }
  toggleSortingDirection() {
    this.isAscending = !this.isAscending;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  logout() {
    this.authService.logout();
    this.route.navigate(["/"]);
  }
  landingPage() {
    this.route.navigate(["/estimation-tool/"]);
    
  }
  sortData(column: string) {
    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.tableData.sort((a, b) => {
      const valueA = a[this.sortedColumn];
      const valueB = b[this.sortedColumn];

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  openDialog(item: any): void {
    this.taskService.setSharedItem(item);
  
    let dialogRef = this.dialog.open(TaskModalComponent, {
      width: "650px",
      height: "540px",
      data: { item },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Inside this block, you will get the latest value when the modal is closed
      const latestValue = this.taskService.sharedItemSubject.getValue();
      if (latestValue) {
        this.modifyItems.push(latestValue);
        console.log(this.modifyItems);
      }
      
      console.log("The dialog was closed");
    });
  }
  isEditing(item: any, field: string): boolean {
    return item === this.editingItem && field === this.editingField;
  }

  startEditing(item: any, field: string): void {
    if (this.editableFields.includes(field)) {
      this.editingItem = item;
      this.editingField = field;
    }else{
      this.openDialog(item);
    }
    
  }
  stopEditing(item: any, field: string): void {
    this.modifyItems.push(item);
    console.log(this.modifyItems);
    this.editingItem = null;
    this.editingField = "";
  }
  updateEstimatesInJira() {
    if (!this.modifyItems || this.modifyItems.length === 0) {
      // Handle the case where modifyItems is blank
      this.commanService.presentToast(
        "Tasks are up-to-date",
        3000,
        "toast-task-mess"
      );
      return;
    }
    const requestData = {
      updateTask: this.modifyItems,
    };
    this.taskService.updateEstimatesInJira(requestData).subscribe((res) => {
      if (res.code == 200) {
        this.commanService.presentToast(
          "Task updated succussfully",
          3000,
          "toast-task-mess"
        );
        this.modifyItems = [];
      }
    });
  }

  goBack(): void {
    this.route.navigate(["estimation-tool/sprintdashboard"],  {
      queryParams: { sprintId:this.sprintId,  sprintName:this.sprintName, projectId: this.projectId,clientId:this.clientId,projectName: this.projectName, projectStartDate:this.projectStartDate, projectEndDate:this.projectEndDate},
    });
  }

  getIconColor(originalEstimate: number, aiEstimate: number): string {
    const differencePercentage = (originalEstimate - aiEstimate) / aiEstimate * 100;
    
    if (differencePercentage > 10) {
      return 'error';
    } else if (differencePercentage >= 0 && differencePercentage <= 10) {
      return 'warning';
    } else {
      return 'success';
    }
  }

openGraphPopup(event: MouseEvent, item: any) {
    this.taskService.setSharedItem(item);
    const offsetX = 470; 
    const offsetY = 250; 
    
    const clientX = event.clientX;
    const clientY = event.clientY;
    const viewportHeight = window.innerHeight;
    
    let positionTop = clientY;
    if (clientY + offsetY > viewportHeight) {
      
      positionTop = viewportHeight - offsetY;
    }
  
    let dialogRef = this.dialog.open(TaskGraphComponent, {
      width: "450px",
      height: "225px",
      data: { item },
      hasBackdrop: false,
      position: { left: (clientX - offsetX) + 'px', top: positionTop + 'px' },
    });
    dialogRef.afterClosed().subscribe((result) => { 
     
    });
  }
  
closePopup(){
  //this.popover.dismiss();
  this.dialog.closeAll();

}
 
}
