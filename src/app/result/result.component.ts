import { Component, OnInit, Input } from '@angular/core';

const MAX_SIZE = 1e5;
const ERROR_MAX_OUTPUT_SIZE = 'Error: Output exceeded maximum size allowed';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result: string;
  visibleResult: string;

  constructor() { }

  clean() {
    this.result = '';
    this.visibleResult = '';
  }

  addLine(line) {
    this.result += line + '\n';

    if (this.result.length < MAX_SIZE) {
      this.visibleResult = this.result;
    } else {
      this.visibleResult += `${this.result.slice(0, MAX_SIZE)}\n\n${ERROR_MAX_OUTPUT_SIZE}`;
      return false;
    }
  }

  ngOnInit() {
  }

}
