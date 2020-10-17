import 'codemirror/mode/python/python'

import { CSSResultArray, LitElement, css, customElement, html, property } from 'lit-element'
import { IpcChannels, LocalStorageKeys } from '../../consts'

import CodeMirror from 'codemirror'
import { CodeMirrorStyles } from '../../assets/styles/code-mirror-style'
import { IpcUtil } from '../utils'

@customElement('run-py-viewer')
export class RunPyViewer extends LitElement {
  @property({ type: Object }) codeMirrorEditor?: CodeMirror.EditorFromTextArea

  static get styles(): CSSResultArray {
    return [
      CodeMirrorStyles.Basic,
      CodeMirrorStyles.Material,
      css`
        :host {
          display: flex;
          flex: 1;
        }
        :host > .CodeMirror {
          flex: 1;
          height: inherit;
          font-size: var(--code-mirror-font-size);
        }
      `,
    ]
  }
  render() {
    return html`<textarea id="code-viewer"></textarea>`
  }

  firstUpdated(): void {
    document.body.style.setProperty('--code-mirror-font-size', localStorage.getItem(LocalStorageKeys.FontSize + 'pt'))

    let codeEditor: HTMLTextAreaElement | null = this.renderRoot.querySelector('textarea#code-viewer')
    if (codeEditor) {
      this.codeMirrorEditor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        lineWrapping: true,
        scrollbarStyle: 'null',
        theme: 'material',
        mode: 'python',
        readOnly: true,
      })
    }

    IpcUtil.addListener(IpcChannels.ResponseInterpret, this.displayResult.bind(this))
  }

  displayResult(_event: Event, result: string | Error): void {
    if (typeof result === 'string') {
      this.codeMirrorEditor?.setValue(result)
    } else {
      this.codeMirrorEditor?.setValue(result.message)
    }
  }
}
