import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  electron: ElectronService;
  worker;
  result = '';

  constructor(electron: ElectronService) {
    this.electron = electron;
  }

  runCode(code) {
    this.terminate();

    this.worker = new Worker('./assets/app.worker.js');
    this.result = '';

    this.worker.onmessage = ({ data }) => {
      const res = JSON.parse(data);
      console.log(res);
      if (res.finish) {
        console.log('terminate worker');
      } else {
        this.result += this.prepareLog(res.data);
      }
    };

    this.worker.postMessage(code);
  }

  prepareLog(arr) {
    return arr.map(d => {
      if (typeof d === 'string') {
        return `"${d}"`;
      }
      return d;
    }).join` ` + '\n';
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
