import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent  implements OnInit {

  constructor() { }

  items: any[] = [];

  // Pagination variables
  p: number = 1;

  ngOnInit() {}

  loadItems() {
    // Simulated data loading
    this.items = [
    
    ];
  }

}
