import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: any): any {
let firstCharacter=value.substring(0,1);
let allotherCharacter=value.substring(1,value.length)

let newValue=firstCharacter.toUpperCase()+allotherCharacter.toLowerCase();

    return newValue;
  }

}
