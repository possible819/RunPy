import 'codemirror/mode/python/python'

import { CSSResultArray, LitElement, css, customElement, html, property } from 'lit-element'
import CodeMirror, { Editor } from 'codemirror'
import { IpcChannels, LocalStorageKeys } from '../../consts'

import { CodeMirrorStyles } from '../../assets/styles/code-mirror-style'
import { IpcUtil } from '../utils'

@customElement('run-py-editor')
export class RunPyEditor extends LitElement {
  @property({ type: Object }) codeMirrorEditor?: CodeMirror.EditorFromTextArea
  @property({ type: Number }) timeInterval: number = 600
  @property({ type: Object }) timer?: NodeJS.Timer

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
          min-width: 50vw;
          max-width: 50vw;
        }
      `,
    ]
  }
  render() {
    return html`<textarea id="code-editor"></textarea>`
  }

  firstUpdated(): void {
    let codeEditor: HTMLTextAreaElement | null = this.renderRoot.querySelector('textarea#code-editor')
    if (codeEditor) {
      this.codeMirrorEditor = CodeMirror.fromTextArea(codeEditor, {
        lineNumbers: true,
        lineWrapping: true,
        theme: 'material',
        mode: 'python',
        scrollbarStyle: 'null',
        autofocus: true,
      })

      this.codeMirrorEditor.on('changes', this.onChangesHandler.bind(this))
      this.codeMirrorEditor.setValue(this.loadExecutedCode())
    }
  }

  onChangesHandler(editor: Editor) {
    if (this.timer) clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      const codes: string = editor.getValue()
      if (codes) {
        IpcUtil.invoke(IpcChannels.RequestInterpret, codes)
        this.saveExecutedCode(codes)
      }
    }, this.timeInterval)
  }

  loadExecutedCode(): string {
    const codes: string | null = localStorage.getItem(LocalStorageKeys.Code)
    if (codes) {
      return codes
    } else {
      return ''
    }
  }

  saveExecutedCode(codes: string): void {
    localStorage.setItem(LocalStorageKeys.Code, codes)
  }
}