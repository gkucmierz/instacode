import { Component, OnDestroy } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { SettingsService } from './services/settings.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private subs = new SubSink();

  constructor(
    private electron: ElectronService,
    private settings: SettingsService) {

    this.subs.sink = settings.get('theme').subscribe(({value}) => {
      this.setTheme(value);
    });

    this.setTheme('monokai');
  }

  setTheme(theme) {
    document.body.className = `CodeMirror cm-s-${theme}`;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
