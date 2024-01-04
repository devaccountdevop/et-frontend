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
        (item.taskId && item.taskId.toString().includes(searchTerm)) ||
        (item.summary && item.summary.toLowerCase().includes(searchTerm)) ||
        (item.taskDescription && item.taskDescription.toLowerCase().includes(searchTerm)) ||
        (item.estimates.low && item.estimates.low.toString().includes(searchTerm)) ||
        (item.estimates.realistic && item.estimates.realistic.toString().includes(searchTerm)) ||
        (item.estimates.high&& item.estimates.high.toString().includes(searchTerm)) ||
        (item.threePointEstimate && item.threePointEstimate.toString().includes(searchTerm)) ||
        (item.aiEstimate && item.aiEstimate.toString().includes(searchTerm)) ||
        (item.actual && item.actual.toString().includes(searchTerm))
      );
    });
  }

}
