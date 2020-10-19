import '@material/mwc-icon'

import { CSSResult, LitElement, TemplateResult, css, customElement, html, property } from 'lit-element'

import { LocalStorageKeys } from '../../consts'

@customElement('setting-font')
export class SettingFont extends LitElement {
  @property({ type: Number }) max: number = 30
  @property({ type: Number }) defaultSize: number = 12
  @property({ type: Number }) size: number = Number(localStorage.getItem(LocalStorageKeys.FontSize)) || this.defaultSize

  static get styles(): CSSResult {
    return css`
      :host {
        color: var(--theme-color);
      }
      label {
        display: grid;
        grid-template-columns: repeat(3, auto);
      }
      input {
        background: transparent;
        border: none;
        color: var(--theme-color);
        outline: none;
        text-align: center;
        padding: 0;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      mwc-icon {
        font-size: 15pt;
      }
      .suffix {
        margin: auto;
      }
    `
  }

  render(): TemplateResult {
    return html`
      <label
        ><span><mwc-icon>format_size</mwc-icon></span>
        <input
          type="number"
          min="1"
          max="${this.max}"
          @change="${this.onChangeHandler.bind(this)}"
          value="${this.size}"
        />
        <span class="suffix">pt</span>
      </label>
    `
  }

  firstUpdated() {
    if (!localStorage.getItem(LocalStorageKeys.FontSize)) {
      localStorage.setItem(LocalStorageKeys.FontSize, String(this.size))
    }
  }

  onChangeHandler(e: Event): void {
    const input: HTMLInputElement = e.currentTarget as HTMLInputElement
    if (Number(input.value) > this.max) {
      input.value = String(this.max)
    }

    localStorage.setItem(LocalStorageKeys.FontSize, input.value)
    this.dispatchEvent(
      new CustomEvent('setting-changed', { detail: { fontSize: Number(input.value) }, composed: true })
    )
  }
}
