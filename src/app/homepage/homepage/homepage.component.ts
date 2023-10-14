import { Component, OnInit } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent  implements OnInit {

  //dataList: Array<any> = [];
  schedule: { branch: ''; } | undefined;
  pageListNo = 15;
 

  // Pagination variables
  p: number = 1;
  searchText:any;


  loadItems() {
    // Simulated data loading
    this.projectNamesWithId = [
    
    ];
  }
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
  constructor(private modalController: ModalController ) {
  
   }
  menuType: string = 'reveal';
  isModalOpen : boolean = false;
  isDropdownOpen = false;
  projectNamesWithId: { id: number, name: string }[] = [
    { id: 1, name: 'Project1' },
    { id: 2, name: 'Project2' },
    { id: 3, name: 'Project3' },
    { id: 4, name: 'Project4' },
    { id: 5, name: 'Project6' },
    { id: 6, name: 'Project6' },
    { id: 7, name: 'Project7' },
    { id: 8, name: 'Project8' },
    { id: 9, name: 'Project9' },
    { id: 10, name: 'Project10' },
    { id: 11, name: 'Project11' },
    { id: 12, name: 'Project12' },
    { id: 13, name: 'Project13' },
    { id: 14, name: 'Project14' },
    { id: 15, name: 'Project15' },
    { id: 16, name: 'Project16' },
    { id: 17, name: 'Project17' },
    { id: 18, name: 'Project18' },
    { id: 19, name: 'Project19' },
    { id: 20, name: 'Project20' },
    { id: 21, name: 'Project21' },
    { id: 22, name: 'Project22' },
    { id: 23, name: 'Project23' },
    { id: 34, name: 'Project24' },
    { id: 25, name: 'Project25' },
    { id: 26, name: 'Project26' },
    { id: 27, name: 'Project27' },
    { id: 28, name: 'Project28' },
    { id: 29, name: 'Project29' },
    { id: 30, name: 'test' },
    // Add more data here...
  ];
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit() {}
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    
  }
  optionSelected() {
   
    console.log(this.pageFilterDefault); // This will print the selected option's value
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TestComponent,
      cssClass: 'test.component.scss'
    });
    console.log(this.pageFilterDefault);
    await modal.present();
  }

  
}
