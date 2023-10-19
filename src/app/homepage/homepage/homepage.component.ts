import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectsService } from 'src/app/services/homepageServices/projects.service';
import { Project } from './projects';
import { MatDialog } from '@angular/material/dialog';
import { AddClientModelComponent } from '../add-client-model/add-client-model.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent  implements OnInit {

  pageListNo = 15;
  menuType: string = 'reveal';
  isModalOpen : boolean = false;
  isDropdownOpen = false;

  // Pagination variables
  p: number = 1;
  searchText:any;
  projectList: Project[] = [];


  dataList = [
    { code: '1', name: 'M10' },
    { code: '2', name: ' Wipro' },
    { code: '3', name: 'Client 3' }
  ];
  pageFilter=[
  {code: '15', name: '15'},
  {code: '30', name: '30'},
  {code: '45', name: '45'},

]
pageFilterDefault: any= 15;


  selectedValue: string = 'Select'; 
  constructor(private modalController: ModalController, private projectService: ProjectsService, public dialog: MatDialog  ) {
  
   }

   ngOnInit() {
    this.projectService.getProjects().subscribe((res)=>{
     this.projectList=res.data;
     console.log(res.data);
       });   
   }
   setOpen(isOpen: boolean) {
     this.isModalOpen = isOpen;
 
     
   }
   loadItems() {
    // Simulated data loading
    this.projectList = [
    
    ];
  }

 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  optionSelected() {
   
    console.log(this.pageFilterDefault); // This will print the selected option's value
  }

  handleCardClick(projectId:number){
    console.log("handel in same file:"+ projectId)
  }

  public isDialogVisible: boolean = false;
  animal!: string;
  name!: string;
 
 //modal
 openDialog(): void {

  let dialogRef = this.dialog.open(AddClientModelComponent, {
    width: '700px',
    height: '300px',
    // maxHeight:'50000px',
    maxWidth:'100%',
    
    data: { name: this.name, animal: this.animal },
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
    
  });
}
}
