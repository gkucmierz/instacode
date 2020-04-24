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

for (let i = 0; i < 40; ++i) {
  console.log(i);
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

  constructor(private storage: StorageMap) {
    this.codeChange.emit(this.sourceCode);

    this.storage.get('code').subscribe(code => {
      if (code) {
        this.sourceCode = code + '';
      }
      this.codeChange.emit(this.sourceCode);
    });
  }

  ngOnInit() { }

  onChange(code) {
    this.codeChange.emit(code);
    this.storage.set('code', this.sourceCode).subscribe();
  }
}
