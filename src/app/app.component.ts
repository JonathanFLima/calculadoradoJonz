import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Calculadora simples';

  expressionDisplay: string = '';

  calValue: number = 0;
  functionType: string = 'Sem expressão';

  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;

  test(event: KeyboardEventInit): void {
    console.log(event.key);
  }

  onKeydown(event: KeyboardEventInit): void {
    console.log(event.key);

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
      case 'C':
      case 'Escape': this.onClickValue('C', 'function');
      break;

      case 'Delete':
      case 'Backspace': this.onClickValue('DEL', 'function');
      break;

      case '.':
      case ',': this.onClickValue('.', 'function');
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
    if (this.calNumber.length > 7) return;

    if (this.calNumber != 'noValue') {
      this.calNumber += value;
    } else {
      this.calNumber = value;
    }
    this.calValue = parseFloat(this.calNumber);

  }

  onFunctionClick(value: string) {
    if (value == '+/-') {
      this.calValue *= -1;
      return;
    }

    if (value == 'DEL') {
      if (this.calValue == 0) {
        return
      } else {
      let result = this.calNumber.substring(0, this.calNumber.length-1);
      this.calNumber = result;
      }

      if (this.calNumber == "") this.calNumber = "0"
      this.calValue = parseFloat(this.calNumber);

      return;
    }

    if (value == "=" && this.functionType == 'Sem expressão') {
      return;
    }

    if (value == ".") {
      if (this.calNumber.includes(".")) return;

      this.calNumber += ".";
      return;
    }

    if (value == 'C') {
      this.clearAll();
    } else if (this.functionType == 'Sem expressão') {
      this.firstNumber = this.calValue;
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.functionType = value;
      this.expressionDisplay = `${this.firstNumber} ${this.functionType}`;


    } else if (this.functionType != 'Sem expressão') {
          if (this.functionType == value) return
      this.secondNumber = this.calValue;
      this.expressionDisplay = `${this.firstNumber} ${this.functionType} ${this.secondNumber}`;

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
      if (this.firstNumber == 0 || this.secondNumber == 0) {
        alert("Não é possível dividir por zero.");
        this.clearAll();
      } else {
      const TOTAL = this.firstNumber / this.secondNumber;
      this.totalAssignValues(TOTAL, value);
      }

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

    if (this.functionType == 'Sem expressão') {
      return;
    }

    this.expressionDisplay += ` = ${this.calValue}`;
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
    this.expressionDisplay = '';
  }
}
