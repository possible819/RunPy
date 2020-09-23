import { app, BrowserWindow, ipcMain } from 'electron'
import { printOnNode } from './controllers/print-on-node'

function createWindow(): void {
  const mainWindow: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.loadFile('./dist/index.html')

  ipcMain.handle('channel', (event, args) => {
    printOnNode(args)
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
