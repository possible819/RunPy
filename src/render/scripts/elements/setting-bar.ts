import './setting-font'

import { CSSResult, LitElement, TemplateResult, css, customElement, html } from 'lit-element'

@customElement('setting-bar')
export class SettingBar extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
      }
      setting-font {
        margin-left: auto;
      }
    `
  }

  render(): TemplateResult {
    return html` <setting-font></setting-font> `
  }
}
