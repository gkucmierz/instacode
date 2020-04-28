import {
  OnInit, Component, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  fromHash = false;

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

  constructor(
    private code: CodeService,
    private route: ActivatedRoute) {

    code.get().subscribe(sourceCode => {
      if (!this.fromHash) {
        this.sourceCode = sourceCode;
        this.fromHash = false;
      }
    });

    route.fragment.subscribe((fragment: string) => {
      try {
        if (fragment !== '') {
          code.set(atob(fragment));
          this.fromHash = true;
        }
      } catch (e) { }
    });
  }

  ngOnInit() { }

  onChange(code) {
    this.code.set(code);
  }
}
