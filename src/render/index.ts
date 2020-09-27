import './assets/styles/shared-style.css'
import './scripts/elements/run-py-editor'
import './scripts/elements/run-py-viewer'

import { CSSResult, LitElement, css, customElement, html } from 'lit-element'

// const args: string = 'Hello from NodeJS'
// const renderProcess = new RenderProcess()
// renderProcess.invoke(args)

@customElement('run-py')
export class RunPy extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        flex: 1;
      }
      #container {
        display: flex;
        flex: 1;
      }
      #container > .section {
        display: flex;
        flex: 1;
      }
    `
  }

  render() {
    return html`
      <div id="container">
        <div id="editor-section" class="section">
          <run-py-editor></run-py-editor>
        </div>
        <div id="viewer-section" class="section">
          <run-py-viewer></run-py-viewer>
        </div>
      </div>
    `
  }
}
