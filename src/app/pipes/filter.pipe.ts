import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    console.log(items,searchTerm);
    
    if(items.length === 0){
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    return items.filter((search:any)=>(search.projectName || search.sprintName || search.sprintId)?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1)
  }

}
