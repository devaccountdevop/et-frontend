import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { TaskService } from "src/app/services/task.service";
import { CommanLoaderService } from "src/app/services/comman-loader.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  projectId:any;
  projectName:any;
  sprintId: any;
  sprintName: any = "et-Sprint 1";
  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  id: any = 45;
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
  editingItem: any = null; // Track the currently editing item
  editingField: string = ""; // Track the field being edited
  modifyItems: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  pageFilterDefault: any = 8;
  clientId: any;
  sortedColumn: string = "title"; // Default sorting column
  isAscending: boolean = true; //
  showPopup: boolean = false;
  tableData: any[] = [
    // {
    //   id: 1,
    //   title: "Task A",
    //   description: "LoginPage",
    //   label: "Et-FE-fe",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 2,
    //   title: "Task B",
    //   description: "LoginPage In this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   label: "Et-FE-fe",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 3,
    //   title: "Mallika",
    //   description: "LoginPageIn this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   label: "Et-FE-fe",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4dIn this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 4,
    //   title: "LoginPageIn this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   description: "LoginPageIn this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 5,
    //   title: "Task CIn this article, we will know the HTML Table, various ways to implement it, & will also understand its usage through the examples. HTML Table is an arrangement of data in rows and columns, or possibly in a more complex structure. Tables are widely used in communication, research, and data analysis. Tables are useful for various tasks such as presenting text information and numerical data. It can be used to compare two or more items in the tabular form layout. Tables are used to create database",
    //   description: "LoginPage",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 6,
    //   title: "Task F",
    //   description: "LoginPage",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 7,
    //   title: "Task G",
    //   description: "landingPage",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "1d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 8,
    //   title: "Task H",
    //   description: "homePage",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
    // {
    //   id: 9,
    //   title: "Task I",
    //   description: "signupPage",
    //   lowEstimate: "5d",
    //   realisticEstimate: "7d",
    //   highEstimate: "4d",
    //   threePointEstimate: "3d",
    //   aiEstimate: "3d",
    //   actualHrs: "3d",
    // },
  ];
  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService,
    private taskService: TaskService,
    private commanService: CommanLoaderService
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
    });
    if (this.sprintId !== 0) {
      this.taskService.getTaskBySprintId(this.sprintId, this.projectId).subscribe((res) => {
        this.tableData = res.data;
      });
    }
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
    this.route.navigate(["/estimation-tool/homepage"]);
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
    this.route.navigate(["estimation-tool/homepage/sprintdashboard"], {
      queryParams: { projectId: this.projectId, projectName: this.projectName },
    });
  }
}
