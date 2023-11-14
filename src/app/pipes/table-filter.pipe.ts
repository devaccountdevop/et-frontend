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
        (item.id && item.id.toString().includes(searchTerm)) ||
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.description && item.description.toLowerCase().includes(searchTerm)) ||
        (item.lowEstimate && item.lowEstimate.toString().includes(searchTerm)) ||
        (item.realisticEstimate && item.realisticEstimate.toString().includes(searchTerm)) ||
        (item.highEstimate && item.highEstimate.toString().includes(searchTerm)) ||
        (item.threePointEstimate && item.threePointEstimate.toString().includes(searchTerm)) ||
        (item.aiEstimate && item.aiEstimate.toString().includes(searchTerm)) ||
        (item.actualHrs && item.actualHrs.toString().includes(searchTerm))
      );
    });
  }

}
