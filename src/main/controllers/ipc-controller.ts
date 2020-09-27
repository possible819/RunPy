import { BrowserWindow, ipcMain } from 'electron'

import { IpcChannels } from '../consts'

export class IpcController {
  private window: BrowserWindow

  constructor(window: BrowserWindow) {
    this.window = window
  }

  sendMessage(channel: IpcChannels, args: any): void {
    this.window.webContents.send(channel, args)
  }

  addListener(channel: IpcChannels, handler: (event: Event, args: any) => any): void {
    ipcMain.handle(channel, handler)
  }
}
