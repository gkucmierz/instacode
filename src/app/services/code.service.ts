import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import { OutputService } from './output.service';

export enum CodePriority {
  USER_INPUT = 1,
  URL = 2,
  STORAGE = 3,
  PREDEFINED = 4,
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  subject = new BehaviorSubject<string>('');
  worker: Worker;
  priority: number;

  constructor(
    private storage: StorageMap,
    private output: OutputService) {

    this.storage.get('code').subscribe(code => {
      if (code) {
        this.set(code, CodePriority.STORAGE);
      }
    });

    this.set(`
for (let i = 0; i < 40; ++i) {
  console.log(i);
}
`, CodePriority.PREDEFINED);
  }

  set(code, priority) {
    if (priority < this.priority) {
      return false;
    }
    this.run(code);
    this.subject.next(code);
    this.storage.set('code', code).subscribe();
    return true;
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
