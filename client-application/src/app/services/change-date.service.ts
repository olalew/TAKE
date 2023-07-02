import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChangeDateService {
  constructor() { }

  public changeDateToString(date: Date): string {
    let stringDate = date.getFullYear().toString() + '-';
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if(month < 10) {
      stringDate += '0' + month + '-';
    } else {
      stringDate += month + '-';
    }
    if(day < 10) {
      stringDate += '0' + day;
    } else {
      stringDate += day;
    }
    return stringDate;
  }
}
