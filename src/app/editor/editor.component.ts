import {
  OnInit, Component, ViewChild,
  Output, EventEmitter
} from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/markdown/markdown';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild('codeEditor', { static: true }) codeEditor: CodemirrorComponent;
  @Output() codeChange = new EventEmitter();

  sourceCode = `
const MAX = 5;
const date = new Date();
let cnt = 0;
while (1) {
  const tmp = new Date();
  if (1e3 * cnt <= tmp - date) {
    console.log('cnt', cnt, +tmp);
    if (MAX < ++cnt) {
      break;
    }
  }
}
`;

  readonly codemirrorOptions = {
    value: 'dupa',
    theme: 'monokai',
    autofocus: true,
    viewportMargin: Infinity,
    indentUnit: 2,
    smartIndent: true,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    lineNumbers: true,
    lineNumberFormatter: ln => `${ln}`,
    fixedGutter: true,
    scrollbarStyle: 'null',
    mode: 'text/typescript',
    // mode: 'markdown',
    // mode: 'htmlmixed',
  };

  ngOnInit() {
    this.codeChange.emit(this.sourceCode);
  }

  onChange(code) {
    this.codeChange.emit(code);
  }
}
