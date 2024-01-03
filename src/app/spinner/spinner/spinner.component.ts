import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent  implements OnInit {

  spinnerVisible!: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinnerVisibility$.subscribe(
      (visibility) => (this.spinnerVisible = visibility)
    );
  }

  ngOnInit() {}

}
