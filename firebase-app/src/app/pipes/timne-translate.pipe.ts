import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTranslate'
})
export class TimeTranslatePipe implements PipeTransform {
  transform(value: string | string[]): string {
    const mapping: { [key: string]: string } = {
      DayTime: 'Diurna',
      NightTime: 'Nocturna',
      Virtual: 'Virtual'
    };

    if (Array.isArray(value)) {
      return value.map(v => mapping[v] || v).join(', ');
    }

    // Si viene en string tipo "DayTime,NightTime"
    if (typeof value === 'string' && value.includes(',')) {
      return value.split(',').map(v => mapping[v.trim()] || v.trim()).join(', ');
    }

    return mapping[value] || value;
  }
}
