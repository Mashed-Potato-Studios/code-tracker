import type {ITrackingStrategy, IStorageStrategy, IFileTracker} from '../../types'
import * as fs from "fs";
import chokidar from "chokidar";
export class DefaultTrackingStrategy implements ITrackingStrategy {
  // Default tracking logic
  private totalLinesOfCode: number = 0
  private files: IFileTracker = {}
  private watchers = {} as { [file: string]: chokidar.FSWatcher };

  async trackFile(filePath: string): Promise<void> {
    return new Promise(async (resolve, reject) => {

      const currentWorkingDirectory = process.cwd()
        const absoluteFilePath = `${currentWorkingDirectory}/${filePath}`

        if (this.files[filePath]) {
            throw new Error(`File "${filePath}" is already being tracked.`)
        }

      // Implementation of adding a file
      await this.updateFile(filePath)

      const watcher = chokidar.watch(filePath, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: true,
      })
        watcher.on('change', async () => {
            await this.updateFile(filePath)
        })
        // const lines = data.split('\n');

      // this.files[filePath] = linesOfCode
      // this.totalLinesOfCode += linesOfCode
      resolve()
    })
  }

  updateFile(filePath: string): Promise<void> {
    // Implementation of updating a file
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        // Determine number of lines of code
        const lines = data.split('\n');
        const linesOfCode = lines.filter(line => {
          const trimmedLine = line.trim()
            return trimmedLine !== '' && !trimmedLine.startsWith('//')
        }).length


        this.files[filePath] = linesOfCode
      console.log(`The file ${filePath} has ${linesOfCode} lines of code`)
      resolve()
    })
    })

  }

  removeFile(filePath: string): void {
  if (!this.files[filePath]) {
    console.warn(`File "${filePath}" is not being tracked.`);
    return;
  }

  // Close the watcher if you have one
  this.watchers[filePath]?.close();

  // Subtract the lines of code from the total
  this.totalLinesOfCode -= this.files[filePath];

  // Remove the file from tracking
  delete this.files[filePath];
}

  getFiles(): IFileTracker {
    return {...this.files}
  }

  getTotalLinesOfCode(): number {
    return this.totalLinesOfCode
  }
}

export class LocalStorageStrategy implements IStorageStrategy {
  // Logic to save and load from local storage
  private readonly storageKey: string = 'codeTrackerData'

  save(files: IFileTracker, totalLinesOfCode: number): void {
    // Serialize and save the data to local storage
    const data = JSON.stringify({ files, totalLinesOfCode })
    localStorage.setItem(this.storageKey, data)
  }

  load(): { files: IFileTracker; totalLinesOfCode: number } | null {
    // Load and deserialize the data from local storage
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : null
  }
}
