import { exec } from 'child_process'
import { app } from 'electron'
import fs from 'fs'
import path from 'path'
import util from 'util'

export class PythonUtil {
  public pythonPath: string = 'python3'
  public filePath: string = path.resolve(app.getAppPath(), '../temp.py')

  private asyncExec: any = util.promisify(exec)

  async interpret(codes: string): Promise<string> {
    this.writeTempFile(codes)
    return await this.executePython()
  }

  writeTempFile(codes: string): void {
    try {
      const pythonCode: string = this.buildCodes(codes)
      fs.writeFileSync(this.filePath, pythonCode)
    } catch (e) {
      throw e
    }
  }

  async executePython(): Promise<string> {
    try {
      const { stdout }: { stdout: string; stderr: string } = await this.asyncExec(this.buildCommand())
      return stdout
    } catch (e) {
      return e
    }
  }

  buildCodes(codes: string): string {
    let src: string = 'try:\n'

    codes.split('\n').forEach((code: string) => {
      src += '  ' + code + '\n'
    })
    src += 'except Exception as e:\n'
    src += '  print(e)'

    return src
  }

  buildCommand(): string {
    return `${this.pythonPath} ${this.filePath}`
  }
}
