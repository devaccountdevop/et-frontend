import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableShort'
})
export class TableShortPipe implements PipeTransform {

  transform(array: any[], field: string, isDesc: boolean = false): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    array.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) {
        return isDesc ? 1 : -1;
      } else if (aValue > bValue) {
        return isDesc ? -1 : 1;
      } else {
        return 0;
      }
    });

    return array;
  }

}
