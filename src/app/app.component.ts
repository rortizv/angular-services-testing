import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testing-app';
  name = '';

  ngOnInit() {
    const calculator = new Calculator();
    console.log(calculator.add(8, 2));
  }
}
