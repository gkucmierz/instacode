import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface OutputChunk {
  clean?: boolean;
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  subject = new BehaviorSubject<OutputChunk>({data: ''});

  constructor() { }

  clean() {
    this.subject.next({clean: true});
  }

  push(data) {
    this.subject.next({data});
  }

  get() {
    return this.subject;
  }
}
