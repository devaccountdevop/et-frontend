import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/homepageServices/projects.service';
import { SprintService } from 'src/app/services/sprint.service';
import { Project } from '../homepage/projects';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.scss'],
})
export class SprintDashboardComponent  implements OnInit {
  
  projectName:any;
  projectId:any;
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
  pageFilterDefault: any = 15;

  clientId: any;
  constructor(
    private modalController: ModalController,
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private sprintService: SprintService,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationService
    
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
      this.projectName= params['projectName'];
   });
   if(this.projectId !== 0){
      this.sprintService.getSprints(this.projectId).subscribe((res)=>{
        this.sprintsList = res.data;
      });
   }

    // this.clientService.getClient().subscribe((res) => {
    //   this.clientList = res.data;
    //   if (this.clientList.length > 0) {
    //     const clienttId = this.clientList[0].id;
    //     this.clientId = clienttId;
    //   }
    // });
    // this.projectService.getProjects(this.id).subscribe((res) => {
    //   if (res.data.length > 0) {
    //     this.projectList = res.data;
    //   }
    //});
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loadItems() {
    // Simulated data loading
    this.sprintsList = [];
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
  
  landingPage(){
    this.route.navigate(['/estimation-tool/homepage']);
  }
  getTask(sprintId:any){
    console.log(sprintId);
    this.route.navigate(['/estimation-tool/homepage/tasklist']);
  }


}
