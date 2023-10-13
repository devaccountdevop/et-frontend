import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.scss'],
})
export class DashboardBodyComponent  implements OnInit {

  constructor() { }
  handleCardClick() {
    // Implement your action here
    console.log('Card clicked. Perform your action here.');
  }

  ngOnInit() {}

}
