import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Calculadora simples';

  calValue: number = 0;
  functionType: string = 'Sem expressão';

  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;

  onKeydown(event: KeyboardEvent): void {

    switch(event.key) {
      case '0': this.onClickValue('0', 'number');
      break;

      case '1': this.onClickValue('1', 'number');
      break;

      case '2': this.onClickValue('2', 'number');
      break;

      case '3': this.onClickValue('3', 'number');
      break;

      case '4': this.onClickValue('4', 'number');
      break;

      case '5': this.onClickValue('5', 'number');
      break;

      case '6': this.onClickValue('6', 'number');
      break;

      case '7': this.onClickValue('7', 'number');
      break;

      case '8': this.onClickValue('8', 'number');
      break;

      case '9': this.onClickValue('9', 'number');
      break;

      case 'Enter':
      case '=': this.onClickValue('=', 'function');
      break;

      case '+': this.onClickValue('+', 'function');
      break;

      case '-': this.onClickValue('-', 'function');
      break;

      case '/': this.onClickValue('/', 'function');
      break;

      case '*': this.onClickValue('*', 'function');
      break;

      case '%': this.onClickValue('%', 'function');
      break;

      case 'c':
      case 'C': this.onClickValue('C', 'function');
      break;
    }
  }

  onClickValue(value: string, type: any) {
    if (type == 'number') {
      return this.onNumberClick(value);
    } else if (type == 'function') {
      return this.onFunctionClick(value);
    }
  }

  onNumberClick(value: string) {
    if (this.calNumber != 'noValue') {
      this.calNumber += value;
    } else {
      this.calNumber = value;
    }
    this.calValue = parseFloat(this.calNumber);
  }

  onFunctionClick(value: string) {

    if (value == 'C') {
      this.clearAll();
    } else if (this.functionType == 'Sem expressão') {
      this.firstNumber = this.calValue;
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.functionType = value;
    } else if (this.functionType != 'Sem expressão') {
      this.secondNumber = this.calValue;

      this.calculateValue(value);
    }
  }

  calculateValue(value: string) {
    if (this.functionType == '+') {
      const TOTAL = this.firstNumber + this.secondNumber;
      this.totalAssignValues(TOTAL, value);
    }

    if (this.functionType == '-') {
      const TOTAL = this.firstNumber - this.secondNumber;
      this.totalAssignValues(TOTAL, value);
    }

    if (this.functionType == '/') {
      const TOTAL = this.firstNumber / this.secondNumber;
      this.totalAssignValues(TOTAL, value);
    }

    if (this.functionType == '*') {
      const TOTAL = this.firstNumber * this.secondNumber;
      this.totalAssignValues(TOTAL, value);
    }

    if (this.functionType == '%') {
      const TOTAL = this.firstNumber % this.secondNumber;
      this.totalAssignValues(TOTAL, value);
    }
  }

  totalAssignValues(total: number, value: string) {
    this.calValue = total;
    this.firstNumber = total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.functionType = value;

    if (value == '=') this.onEqualPress();
  }



  onEqualPress() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.functionType = 'Sem expressão';
    this.calNumber = 'noValue';
  }

  clearAll() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.calValue = 0;
    this.functionType = 'Sem expressão';
    this.calNumber = 'noValue';
  }
}
