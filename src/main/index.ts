import { BrowserWindow, app } from 'electron'

import { IpcChannels } from './consts'
import { IpcController } from './controllers/ipc-controller'
import { MenuController } from './controllers/menu-controller'
import { PythonUtil } from './controllers/python-util'

function createWindow(): void {
  const mainWindow: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  })

  const menuController: MenuController = new MenuController()
  menuController.setApplicationMenu()

  mainWindow.loadFile('./dist/index.html')
  const pythonUtil: PythonUtil = new PythonUtil()
  const ipcController: IpcController = new IpcController(mainWindow)
  ipcController.addListener(IpcChannels.RequestInterpret, async (event: Event, codes: string) => {
    const result: string = await pythonUtil.interpret(codes)
    ipcController.sendMessage(IpcChannels.ResponseInterpret, result)
  })
}

app.whenReady().then((): void => {
  createWindow()

  app.on('activate', (): void => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', (): void => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
