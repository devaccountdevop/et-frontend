import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      // Modify this condition based on the properties you want to search
      return (
        item.id.toString().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.lowEstimate.toString().includes(searchTerm) ||
        item.realisticEstimate.toString().includes(searchTerm) ||
        item.highEstimate.toString().includes(searchTerm) ||
        item.threePointEstimate.toString().includes(searchTerm) ||
        item.aiEstimate.toString().includes(searchTerm) ||
        item.actualHrs.toString().includes(searchTerm)
      );
    });
  }

}
