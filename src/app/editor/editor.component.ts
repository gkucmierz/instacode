import { OnInit, Component, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/markdown/markdown';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @ViewChild('codeEditor', { static: true }) codeEditor: CodemirrorComponent;

  private sourceCode = `
// https://gist.github.com/gkucmierz/97a36a8ccdb37557cac6af847745e3be
// play sine wave in browser

const sound = (() => {
  return {
    play: (duration = 1e3) => {
      const context = new AudioContext();
      const o = context.createOscillator();
      o.type = 'sine';
      o.connect(context.destination);
      o.start();
      setTimeout(() => o.stop(), duration);
    }
  };
})();

setInterval(sound.play, 2e3);
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
}
