import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  async dismiss() {
    await this.modalController.dismiss();
  }

  ngOnInit() {}

}
