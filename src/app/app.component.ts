import { Component } from '@angular/core';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  electron: ElectronService;

  constructor(electron: ElectronService) {
    this.electron = electron;
  }
}
