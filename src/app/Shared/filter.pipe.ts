import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
@Pipe({
  name:'search'
})
export class SearchPip implements PipeTransform{
  transform(value: any[], filter: string, propName: string): any[] {

    if (!value || value.length === 0 || !filter) {
      return value || [];
    }

    filter = filter.toLowerCase(); // Convert filter to lowercase for case-insensitive matching

    return value.filter(element => {
      const propValue = element[propName].toLowerCase();
      return propValue.includes(filter);
    });
  }

}
