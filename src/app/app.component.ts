import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(electron: ElectronService,
    private ref: ChangeDetectorRef) {
    this.electron = electron;
  }

  cleanResult() {
    this.result = '';
  }

  addResult(line) {
    this.result += line + '\n';

    // electron need this to refresh view
    this.ref.detectChanges();
  }

  runCode(code) {
    this.terminate();

    this.worker = new Worker('./assets/app.worker.js');
    this.cleanResult();

    this.worker.onmessage = ({ data }) => {
      const res = JSON.parse(data);
      if (res.finish) {
        console.log('terminate worker');
      } else {
        this.addResult(res.data);
      }
    };

    this.worker.onerror = error => {
      this.addResult(error.message);
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
