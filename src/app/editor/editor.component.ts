import {
  OnInit, OnDestroy, Component, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { CodeService, CodePriority } from '../services/code.service';
import { merge } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  @ViewChild('codeEditor', { static: true }) codeEditor: CodemirrorComponent;
  private subs = new SubSink();
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
    this.subs.sink = this.code.get().subscribe(sourceCode => {
      if (!this.fromHash && sourceCode !== this.sourceCode) {
        this.sourceCode = sourceCode;
        this.fromHash = false;
        this.ref.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onChange(code) {
    this.code.set(code, CodePriority.USER_INPUT);
  }
}
