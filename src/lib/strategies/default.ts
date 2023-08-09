import type { ITrackingStrategy, IStorageStrategy } from '../../types'
export class DefaultTrackingStrategy implements ITrackingStrategy {
  // Default tracking logic
  private totalLinesOfCode: number = 0
  private files: IFileTracker = {}

  trackFile(file: string, linesOfCode: number): void {
    // Implementation of adding a file
    this.files[file] = linesOfCode
    this.totalLinesOfCode += linesOfCode
  }

  updateFile(file: string, newLinesOfCode: number): void {
    // Implementation of updating a file
    const oldLinesOfCode = this.files[file]
    this.totalLinesOfCode -= oldLinesOfCode
    this.totalLinesOfCode += newLinesOfCode
    this.files[file] = newLinesOfCode
  }

  removeFile(file: string): void {
    // Implementation of removing a file
    this.totalLinesOfCode -= this.files[file]
    delete this.files[file]
  }

  getFiles(): IFileTracker {
    return this.files
  }

  getTotalLinesOfCode(): number {
    return this.totalLinesOfCode
  }
}

class LocalStorageStrategy implements IStorageStrategy {
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
