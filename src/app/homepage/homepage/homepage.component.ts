import { Component, OnInit } from "@angular/core";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { Project } from "./projects";
import { MatDialog } from "@angular/material/dialog";
import { AddClientModelComponent } from "../add-client-model/add-client-model.component";
import { AddClientService } from "src/app/services/homepageServices/add-client.service";
import {  Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ImportModalComponent } from "../import-modal/import-modal.component";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  pageListNo = 15;
  menuType: string = "reveal";
  isModalOpen: boolean = false;
  isDropdownOpen = false;
  // Pagination variables
  p: number = 1;
  searchText: any;
  pageFilterDefault: any = 15;
  clientId: any;
  projectList: Project[] = [];

  clientList: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  constructor(
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private clientService: AddClientService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.clientService.getClient().subscribe((res) => {
      this.clientList = res.data;
      if (this.clientList.length > 0) {
        const clienttId = this.clientList[0].id;
        this.clientId = clienttId;
        this.projectService.getProjects(this.clientId).subscribe((res) => {
          if (res.data.length > 0) {
            this.projectList = res.data;
          }
        });
      }
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  optionSelected() {
    console.log(this.pageFilterDefault); // This will print the selected option's value
  }
  getProjectByselectedClient() {
    if (this.clientId !== undefined) {
      this.projectService.getProjects(this.clientId).subscribe((res) => {
        this.projectList = res.data;
      });
    }
  }
  public isDialogVisible: boolean = false;

  //modal
  openDialog(): void {
    let dialogRef = this.dialog.open(AddClientModelComponent, {
      width: "700px",
      height: "300px",
      // maxWidth: "100%",
      data: { },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  getSprints(name: any, projectId: number) {
    this.router.navigate(["estimation-tool/homepage/sprintdashboard"], {
      queryParams: { projectId: projectId, projectName: name },
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  openImportDialog(): void {
    let dialogRef = this.dialog.open(ImportModalComponent, {
      width: "600px",
      height: "280px",
      // maxWidth: "100%",
      data: { },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
