import { IpcChannels } from '../../consts'
import { ipcRenderer } from 'electron'

export class IpcUtil {
  static invoke(channel: IpcChannels, args: any): void {
    ipcRenderer.invoke(channel, args)
  }

  static addListener(channel: IpcChannels, listener: (event: Event, message: string) => void): void {
    ipcRenderer.on(channel, listener)
  }
}
