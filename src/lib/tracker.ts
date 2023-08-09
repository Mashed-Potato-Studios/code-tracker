import type {IFileTracker, ICodeTracker, ICodeTrackerCallbackFn} from '../types'

class CodeTracker implements ICodeTracker {
  private totalLinesOfCode: number
  private files: IFileTracker
  private callbacks: ICodeTrackerCallbackFn

  constructor(callbacks?: ICodeTrackerCallbackFn) {
    this.totalLinesOfCode = 0
    this.files = {}
    this.callbacks = callbacks || {}
  }

  trackFile(file: string, linesOfCode: number) {
    if (this.files[file]) {
      // console.warn(`File "${file}" is already being tracked.`)
      throw new Error(`File "${file}" is already being tracked.`)

    }

    this.files[file] = linesOfCode
    this.totalLinesOfCode += linesOfCode

    if (this.callbacks.onFileAdded) {
      this.callbacks.onFileAdded(file, linesOfCode)
    }

    return this;
  }

  updateFile(file: string, newLinesOfCode: number) {
    if (!this.files[file]) {
      // console.warn(`File "${file}" is not being tracked.`)
        throw new Error(`File "${file}" is not being tracked.`)

    }

    const previousLinesOfCode = this.files[file]
    this.totalLinesOfCode -= previousLinesOfCode
    this.totalLinesOfCode += newLinesOfCode

    this.files[file] = newLinesOfCode

    if (this.callbacks.onFileUpdated) {
        this.callbacks.onFileUpdated(file, newLinesOfCode, previousLinesOfCode)
    }

    return this;
  }

  removeFile(file: string) {
    if (!this.files[file]) {
      // console.warn(`File "${file}" is not being tracked.`)
        throw new Error(`File "${file}" is not being tracked.`)
    }

    const linesOfCode = this.files[file]
    this.totalLinesOfCode -= this.files[file]
    delete this.files[file]

    if (this.callbacks.onFileRemoved) {
        this.callbacks.onFileRemoved(file, linesOfCode)
    }

    return this;
  }

  getTotalLinesOfCode(): number {
    return this.totalLinesOfCode
  }

  getFiles(): { [file: string]: number } {
    return this.files
  }
}

// Singleton pattern to ensure there's only one instance of CodeTracker
const codeTrackerInstance = new CodeTracker({
    onFileAdded: (file, linesOfCode) => {
        console.log(`File "${file}" added with ${linesOfCode} lines of code`)
    },
    onFileUpdated: (file, newLinesOfCode, oldLinesOfCode) => {
        console.log(`File "${file}" updated from ${oldLinesOfCode} to ${newLinesOfCode} lines of code`)
    },
    onFileRemoved: (file, linesOfCode) => {
        console.log(`File "${file}" removed with ${linesOfCode} lines of code`)
    }

})
export default codeTrackerInstance
