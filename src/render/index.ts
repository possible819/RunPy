import './assets/styles/shared-style.css'
import './scripts/elements/run-py-editor'
import './scripts/elements/run-py-viewer'
import './scripts/elements/setting-bar'

import { CSSResult, LitElement, css, customElement, html } from 'lit-element'

@customElement('run-py')
export class RunPy extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        width: 90%;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      #container {
        width: 100%;
        display: flex;
        flex: 1;
        overflow: auto;
      }
      #container.resizable {
        cursor: col-resize;
      }
      #editor-section {
        border-right: 1px solid gray;
        width: 50vw;
        min-width: 10vw;
        max-width: 90vw;
        height: 100%;
      }
      #viewer-section {
        flex: auto;
      }
      run-py-editor,
      run-py-viewer {
        height: 100%;
      }
      footer {
        padding: 5px;
        background-color: var(--theme-bg-color);
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

      <footer>
        <setting-bar></setting-bar>
      </footer>
    `
  }

  firstUpdated() {
    this.adjustResizable()
  }

  adjustResizable(): void {
    const container: HTMLDivElement | null = this.renderRoot.querySelector('#container')
    const editorSection: HTMLDivElement | null | undefined = container?.querySelector('#editor-section')
    const viewerSection: HTMLDivElement | null | undefined = container?.querySelector('#viewer-section')

    if (container && editorSection && viewerSection) {
      const resizeHandler = (e: MouseEvent): void => {
        container.setAttribute('resizing', '')
        editorSection.style.width = `${e.clientX}px`
        viewerSection.style.width = `${container.clientWidth - e.clientX}px`
      }

      const removeResizeHandler = (_: MouseEvent): void => {
        container.removeAttribute('resizing')
        container.removeEventListener('mousemove', resizeHandler)
        container.classList.remove('resizable')
      }

      container.addEventListener('mousemove', (e: MouseEvent) => {
        const boundary: number = 5
        const sectionWidth: number = editorSection.clientWidth

        const clientX: number = e.clientX

        if (clientX >= sectionWidth - boundary && clientX <= sectionWidth + boundary) {
          container.classList.add('resizable')
        } else if (!container.hasAttribute('resizing')) {
          container.classList.remove('resizable')
        }
      })

      container.addEventListener('mousedown', (_: MouseEvent) => {
        if (container.classList.contains('resizable')) {
          container.addEventListener('mousemove', resizeHandler)
        }
      })

      container.addEventListener('mouseup', removeResizeHandler)
      container.addEventListener('mouseleave', removeResizeHandler)
    }
  }
}
