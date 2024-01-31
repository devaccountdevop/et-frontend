import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
  
    if (items.length === 0) {
      return [];
    }
  
    if (!searchTerm) {
      return items;
    }
  
    return items.filter((search: any) => {
      const projectIdString = search.projectId ? search.projectId.toString() : '';
      const sprintIdString = search.sprintId ? search.sprintId.toString() : '';
      const projectName = search.projectName ? search.projectName.toLowerCase() : '';
      const sprintName = search.sprintName ? search.sprintName.toLowerCase() : '';
  
      return (
        projectIdString.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projectName.includes(searchTerm.toLowerCase()) ||
        sprintIdString.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sprintName.includes(searchTerm.toLowerCase())
      );
    });
  }
}
