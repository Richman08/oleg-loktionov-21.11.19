import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value >= 9 ? value : '0' + value;
  }

}
