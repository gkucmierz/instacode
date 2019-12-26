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
        this.result += res.data + '\n';
      }
    };

    this.worker.postMessage(code);
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
