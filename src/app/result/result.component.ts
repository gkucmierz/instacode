import { Component, OnInit, Input } from '@angular/core';
import { MAX_DATA_SIZE, ERROR_MAX_DATA_SIZE } from '../app.config';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result: string;
  visibleResult: string;
  limitReached = false;

  constructor() { }

  clean() {
    this.result = '';
    this.visibleResult = '';
    this.limitReached = false;
  }

  addLine(line) {
    // limit storing more data to avoid memory leaks
    if (this.limitReached) {
      return false;
    }

    this.result += line + '\n';

    if (this.result.length < MAX_DATA_SIZE) {
      this.visibleResult = this.result;
    } else {
      this.limitReached = true;
      this.visibleResult += `${this.result.slice(0, MAX_DATA_SIZE)}\n\n${ERROR_MAX_DATA_SIZE}`;
      return false;
    }
  }

  ngOnInit() {
  }

}
