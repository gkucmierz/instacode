import { Component, OnInit, Input } from '@angular/core';

// const MAX_SIZE = 5e5;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result: string;

  constructor() { }

  clean() {
    this.result = '';
  }

  addLine(line) {
    const size = this.result.length;
    const newSize = size + line.length + 1;

    // if (this.result.length >= MAX_SIZE) {
      // console.log('oversized', size, newSize);
    // } else {
    this.result += line + '\n';
    // }
  }

  ngOnInit() {
  }

}
