import { OnInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
// import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @ViewChild('codeEditor', { static: false }) codeEditor: CodemirrorComponent;

  private sourceCode = `

import { OnInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import 'codemirror/mode/javascript/javascript';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
  `;
  
  readonly codemirrorOptions = {
    lineNumbers: false,
    theme: 'material',
    autofocus: true,
    // viewportMargin: Infinity,
    mode: {
      name: 'javascript',
      typescript: true,
    }
  };
}
