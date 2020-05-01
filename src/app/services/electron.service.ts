import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { Router } from '@angular/router';
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  window: any;

  get isElectron(): boolean {
    return this.window && this.window.process && this.window.process.type && true || false;
  }

  constructor(
    private windowRef: WindowRefService,
    private router: Router) {

    this.window = windowRef.window;

    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.init();
    }
  }

  init() {
    // this.ipcRenderer.send('asynchronous-message', 'ping');

    this.ipcRenderer.on('redirect' , (event, data) => {
      this.router.navigateByUrl(data);
    });
  }
}
