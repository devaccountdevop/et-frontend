import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { SprintService } from "src/app/services/sprint.service";
import { Project } from "../../homepage/projects";
import { TaskModalComponent } from "./task-modal/task-modal.component";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  projectName: any;
  projectId: any;
  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  id: any = 45;
  // Pagination variables
  p: number = 1;
  searchText: any;
  sprintsList: Project[] = [];

  // clientList: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  pageFilterDefault: any = 8;

  clientId: any;
  sortedColumn: string = "title"; // Default sorting column
  isAscending: boolean = true; //
  tableData: any[] = [
    {
      id: 1,
      title: "Task A",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 2,
      title: "Task B",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 3,
      title: "Task C",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 4,
      title: "Task D",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 5,
      title: "Task E",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 6,
      title: "Task F",
      description: "LoginPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 7,
      title: "Task G",
      description: "landingPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "1d",
      actualHrs: "3d",
    },
    {
      id: 8,
      title: "Task H",
      description: "homePage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
    {
      id: 9,
      title: "Task I",
      description: "signupPage",
      lowEstimate: "5d",
      realisticEstimate: "7d",
      highEstimate: "4d",
      threePointEstimate: "3d",
      aiEstimate: "3d",
      actualHrs: "3d",
    },
  ];
  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  loadItems() {
    // Simulated data loading
    this.sprintsList = [];
  }

  toggleSortingDirection() {
    this.isAscending = !this.isAscending;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  optionSelected() {
    console.log(this.pageFilterDefault); // This will print the selected option's value
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
  openDialog(id:number): void {
    let dialogRef = this.dialog.open(TaskModalComponent, {
      width: "650px",
      height: "540px",
      // maxWidth: "100%",
      data: {},
      // disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log(id);
    });
  }
}
