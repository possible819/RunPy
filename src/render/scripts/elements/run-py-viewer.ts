import 'codemirror/mode/python/python'

import { CSSResultArray, LitElement, css, customElement, html, property } from 'lit-element'

import CodeMirror from 'codemirror'
import { CodeMirrorStyles } from '../../assets/styles/code-mirror-style'
import { IpcChannels } from '../../consts'
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
        }
      `,
    ]
  }
  render() {
    return html`<textarea id="code-viewer"></textarea>`
  }

  firstUpdated(): void {
    let codeEditor: HTMLTextAreaElement | null = this.renderRoot.querySelector('textarea#code-viewer')
    if (codeEditor) {
      this.codeMirrorEditor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        lineWrapping: true,
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
