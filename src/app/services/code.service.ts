import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { OutputService } from './output.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  subject = new BehaviorSubject<string>('');
  worker: Worker;

  constructor(
    private storage: StorageMap,
    private output: OutputService) {

    this.storage.get('code').subscribe(code => {
      if (code) {
        this.set(code);
      }
    });

    this.set(`
for (let i = 0; i < 40; ++i) {
  console.log(i);
}
`);
  }

  set(code) {
    this.run(code);
    this.subject.next(code);
    this.storage.set('code', code).subscribe();
  }

  get() {
    return this.subject;
  }

  private run(code) {
    this.terminate();
    this.output.clean();

    this.worker = new Worker('../app.worker', { type: 'module' });

    this.worker.onmessage = ({ data }) => {
      this.output.push(data);
    };

    this.worker.onerror = error => {
      this.output.push(error.message);
    };

    this.worker.postMessage(code);
  }

  private terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
