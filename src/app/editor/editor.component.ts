import {
  OnInit, Component, ViewChild,
  Output, EventEmitter
} from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild('codeEditor', { static: true }) codeEditor: CodemirrorComponent;
  @Output() codeChange = new EventEmitter();

  sourceCode = `
const delay = 10;
let time = new Date() - delay;

for (let i = 0; i < 1e7; ++i) {
  const now = new Date();
  if (now - delay > time) {
    console.log(+time, i);
    time = now;
  }
}
`;

  readonly codemirrorOptions = {
    theme: 'monokai',
    mode: 'text/typescript',
    keyMap: 'sublime',
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: false,

    autofocus: true,
    viewportMargin: Infinity,
    indentUnit: 2,
    smartIndent: true,
    lineNumbers: true,
    lineNumberFormatter: ln => `${ln}`,
    fixedGutter: true,
    scrollbarStyle: 'null',

    styleActiveLine: true,
    matchbrackets: true,
  };

  constructor(private storage: StorageMap) {}

  ngOnInit() {
    this.codeChange.emit(this.sourceCode);

    this.storage.get('code').subscribe(code => {
      if (code) {
        this.sourceCode = code + '';
      }
      this.codeChange.emit(this.sourceCode);
    });
  }

  onChange(code) {
    this.codeChange.emit(code);
    this.storage.set('code', this.sourceCode).subscribe();
  }
}
