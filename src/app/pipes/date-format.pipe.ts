import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value as Date, 'dd MMM yyyy')?.toUpperCase();
      return formattedDate || null;
    }
    return null;
  }

}
