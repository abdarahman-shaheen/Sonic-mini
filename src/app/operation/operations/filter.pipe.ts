import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
@Pipe({
  name:'search'
})
export class SearchPip implements PipeTransform{
  transform(value: [], filter: string,propName:string) {
   const arrayFilter = [];
   if(value.length==0 || filter==""){
    return value
   }
value.forEach(element => {
  if(element[propName]== filter){
    arrayFilter.push(element);
  }
});
return arrayFilter;
  }

}
