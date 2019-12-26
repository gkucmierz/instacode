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
console.log(123, 123n, "test", true, null, [][2], {}, Symbol(42), new Date());
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
