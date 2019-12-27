import {
  OnInit, Component, ViewChild,
  Output, EventEmitter
} from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
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

  sourceCode = '';

  readonly codemirrorOptions = {
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

  constructor(private storage: StorageMap) {}

  ngOnInit() {
    this.codeChange.emit(this.sourceCode);

    this.storage.get('code').subscribe(code => {
      if (typeof code !== 'undefined') {
        this.sourceCode = code + '';
      }
    });
  }

  onChange(code) {
    this.codeChange.emit(code);
    this.storage.set('code', this.sourceCode).subscribe();
  }
}
