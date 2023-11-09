import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  public value = 'Any value';

  constructor() { }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getPromiseValue(): Promise<string> {
    return Promise.resolve('Promise value');
  }

  getObservableValue(): Observable<string> {
    return of('Observable value');
  }

}
