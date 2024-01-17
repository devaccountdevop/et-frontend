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
        (item.taskId && item.taskId.toLowerCase().includes(searchTerm)) ||
        (item.summary && item.summary.toLowerCase().includes(searchTerm)) ||
        (item.taskDescription && item.taskDescription.toLowerCase().includes(searchTerm)) ||
        (Array.isArray(item.labels) && item.labels.some((label:any) => typeof label === 'string' && label.toLowerCase().includes(searchTerm)))
   
      );
    });
  }

}
