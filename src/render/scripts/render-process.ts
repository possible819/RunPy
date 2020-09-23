import { ipcRenderer } from 'electron'

export class RenderProcess {
  invoke(args: string): void {
    ipcRenderer.invoke('channel', args)
  }
}
