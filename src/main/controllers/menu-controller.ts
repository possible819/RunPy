import { BrowserWindow, Menu, MenuItem, app, dialog, shell } from 'electron'

import { MenuItemConstructorOptions } from 'electron/main'

export class MenuController {
  private menuTemplate: (MenuItemConstructorOptions | MenuItem)[]

  constructor() {
    this.menuTemplate = [
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectAll' },
        ],
      },
      {
        label: 'About',
        submenu: [
          {
            label: 'Learn More',
            click(): void {
              shell.openExternal('https://github.com/possible819/RunPy')
            },
          },
          {
            label: 'Version',
            click(menuItem: MenuItem, browserWindow: BrowserWindow | undefined) {
              if (browserWindow) {
                dialog.showMessageBox(browserWindow, {
                  type: 'info',
                  title: 'Version',
                  message: `
                    Version: ${app.getVersion()}
                  `,
                  buttons: ['close'],
                })
              }
            },
          },
        ],
      },
    ]
  }

  setApplicationMenu(menuTemplate: (MenuItemConstructorOptions | MenuItem)[] = this.menuTemplate) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
  }
}
