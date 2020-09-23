import { RenderProcess } from './scripts/render-process'

const args: string = 'Hello from NodeJS'
const renderProcess = new RenderProcess()
renderProcess.invoke(args)
