import {
  Component, OnInit, Input, ChangeDetectorRef
} from '@angular/core';
import { MAX_DATA_SIZE, ERROR_MAX_DATA_SIZE } from '../app.config';
import { OutputService } from '../services/output.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  result = '';
  visibleResult = '';
  limitReached = false;

  constructor(
    private output: OutputService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.output.get().subscribe(({clean, data}) => {
      if (clean) {
        this.clean();
      }
      if (data) {
        this.addLine(data);
      }
      this.ref.detectChanges();
    });
  }

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

}
