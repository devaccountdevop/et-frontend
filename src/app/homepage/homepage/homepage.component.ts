import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ProjectsService } from "src/app/services/homepageServices/projects.service";
import { Project } from "./projects";
import { MatDialog } from "@angular/material/dialog";
import { AddClientModelComponent } from "../add-client-model/add-client-model.component";
import { AddClientService } from "src/app/services/homepageServices/add-client.service";
import { SprintService } from "src/app/services/sprint.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

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
  id: any = 45;
  // Pagination variables
  p: number = 1;
  searchText: any;

  projectList: Project[] = [];

  clientList: any[] = [];
  pageFilter = [
    { code: "15", name: "15" },
    { code: "30", name: "30" },
    { code: "45", name: "45" },
  ];
  pageFilterDefault: any = 15;

  clientId: any;
  constructor(
    private modalController: ModalController,
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private clientService: AddClientService,
    private sprintService: SprintService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.clientService.getClient().subscribe((res) => {
      this.clientList = res.data;
      if (this.clientList.length > 0) {
        const clienttId = this.clientList[0].id;
        this.clientId = clienttId;
      }
    });
    this.projectService.getProjects(this.id).subscribe((res) => {
      if (res.data.length > 0) {
        this.projectList = res.data;
      }
    });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loadItems() {
    // Simulated data loading
    this.projectList = [];
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
  animal!: string;
  name!: string;

  //modal
  openDialog(): void {
    let dialogRef = this.dialog.open(AddClientModelComponent, {
      width: "700px",
      height: "300px",
      // maxWidth: "100%",

      data: { name: this.name, animal: this.animal },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.animal = result;
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
}
