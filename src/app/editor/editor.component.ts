import {
  OnInit, Component, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { CodeService } from '../services/code.service';
import { merge } from 'rxjs';

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
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.code.get().subscribe(sourceCode => {
      if (!this.fromHash && sourceCode !== this.sourceCode) {
        this.sourceCode = sourceCode;
        this.fromHash = false;
        this.ref.detectChanges();
      }
    });

    this.route.fragment.subscribe((fragment: string) => {
      try {
        if (typeof fragment === 'string' && fragment !== '') {
          const code = atob(fragment);
          console.log(typeof fragment, fragment, code);
          this.code.set(code);
          this.fromHash = true;
          this.sourceCode = code;
          this.ref.detectChanges();
        }
      } catch (e) { }
    });
  }

  onChange(code) {
    this.code.set(code);
  }
}
