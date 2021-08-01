import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe',
})
export class MyPipePipe implements PipeTransform {
  transform(value: string): string {
    const newValue = value.split('#')[1];
    console.log('neww', newValue);

    return newValue;
  }
}
