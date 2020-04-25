import {
  OnInit, Component, ViewChild
} from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @ViewChild('codeEditor', { static: true }) codeEditor: CodemirrorComponent;

  sourceCode = '';

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

  constructor(private code: CodeService) {
    code.get().subscribe(sourceCode => {
      this.sourceCode = sourceCode;
    });
  }

  ngOnInit() { }

  onChange(code) {
    this.code.set(code);
  }
}
