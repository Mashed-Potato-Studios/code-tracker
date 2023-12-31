import type {
  IFileTracker,
  ICodeTrackerCallbackFn,
  ITrackingStrategy,
  IStorageStrategy,
} from '../types'
import { DefaultTrackingStrategy } from './strategies/default'

export class CodeTracker {
  private totalLinesOfCode: number
  private files: IFileTracker
  private callbacks: ICodeTrackerCallbackFn
  private trackingStrategy: DefaultTrackingStrategy
  private storageStrategy?: IStorageStrategy

  constructor(
    callbacks?: ICodeTrackerCallbackFn,
    trackingStrategy?: ITrackingStrategy,
    storageStrategy?: IStorageStrategy
  ) {
    this.totalLinesOfCode = 0
    this.files = {}
    this.trackingStrategy = new DefaultTrackingStrategy()
    this.storageStrategy = storageStrategy
    this.callbacks = callbacks || {}

    const saveData = this.storageStrategy?.load()
    if (saveData) {
      // Restore the saved data
    }
  }

  async trackFile(file: string): Promise<CodeTracker> {
    if (this.files[file]) {
      // console.warn(`File "${file}" is already being tracked.`)
      throw new Error(`File "${file}" is already being tracked.`)
    }

    if (typeof file !== 'string' || file.trim() === '') {
      throw new Error('File name must be a non-empty string.')
    }

    // if (typeof linesOfCode !== 'number' || linesOfCode < 0) {
    //   throw new Error(`Invalid lines of code: ${linesOfCode}`)
    // }

    // this.files[file] = linesOfCode
    // this.totalLinesOfCode += linesOfCode
    await this.trackingStrategy.trackFile(file)
    this.storageStrategy?.save(this.getFiles(), this.getTotalLinesOfCode())

    // if (this.callbacks.onFileAdded) {
    //   this.callbacks.onFileAdded(file, linesOfCode)
    // }

    return this
  }

  async updateFile(file: string): Promise<CodeTracker> {
    if (!this.files[file]) {
      // console.warn(`File "${file}" is not being tracked.`)
      throw new Error(`File "${file}" is not being tracked.`)
    }

     if (typeof file !== 'string' || file.trim() === '') {
      throw new Error('File name must be a non-empty string.')
    }

    await this.trackingStrategy.updateFile(file)

    //     const previousLinesOfCode = this.files[file]
    //     this.totalLinesOfCode -= previousLinesOfCode
    //     this.totalLinesOfCode += newLinesOfCode
    //
    //     this.files[file] = newLinesOfCode

    // if (this.callbacks.onFileUpdated) {
    //   this.callbacks.onFileUpdated(file, newLinesOfCode, previousLinesOfCode)
    // }

    return this
  }

  removeFile(file: string) {
    if (!this.files[file]) {
      // console.warn(`File "${file}" is not being tracked.`)
      throw new Error(`File "${file}" is not being tracked.`)
    }

    this.trackingStrategy.removeFile(file)
    // const linesOfCode = this.files[file]
    // this.totalLinesOfCode -= this.files[file]
    // delete this.files[file]



    // if (this.callbacks.onFileRemoved) {
    //   this.callbacks.onFileRemoved(file, linesOfCode)
    // }

    return this
  }

  getTotalLinesOfCode(): number {
    return this.trackingStrategy.getTotalLinesOfCode()
  }

  getFiles(): { [file: string]: number } {
    return this.trackingStrategy.getFiles()
  }

  getFileDetails(file: string): number | null {
    return this.files[file] || null
  }

  trackFiles(files: { [file: string]: number }): CodeTracker {
    for (const file in files) {
      this.trackFile(file);
    }
    return this;
  }

  removeFiles(files: string[]): CodeTracker {
    files.forEach(file => this.removeFile(file));
    return this;
  }

  filterFiles(minLinesOfCode: number): { [file: string]: number } {
    return Object.fromEntries(
      Object.entries(this.files).filter(([, linesOfCode]) => linesOfCode >= minLinesOfCode)
    );
  }

  getAverageLinesOfCode(): number {
    const fileCount = Object.keys(this.files).length;
    return fileCount === 0 ? 0 : this.totalLinesOfCode / fileCount;
  }

  getTopFiles(limit: number): { [file: string]: number } {
    return Object.fromEntries(
      Object.entries(this.files)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
    );
  }
}

// Singleton pattern to ensure there's only one instance of CodeTracker
export const codeTrackerInstance = new CodeTracker({
  onFileAdded: (file, linesOfCode) => {
    console.log(`File "${file}" added with ${linesOfCode} lines of code`)
  },
  onFileUpdated: (file, newLinesOfCode, oldLinesOfCode) => {
    console.log(
      `File "${file}" updated from ${oldLinesOfCode} to ${newLinesOfCode} lines of code`
    )
  },
  onFileRemoved: (file, linesOfCode) => {
    console.log(`File "${file}" removed with ${linesOfCode} lines of code`)
  },
})
