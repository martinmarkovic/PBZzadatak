import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
 
  transform(user : any, search: any): any { 
    if (search === undefined) return user;
    return user.filter(function(user) {
      return user.username.toLowerCase().includes(search.toLowerCase());
    })
  }

}
