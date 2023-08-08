//TODO: Add more functional types

// Define an interface for tracking files
export interface IFileTracker {
  [file: string]: number
}

export interface ICodeTracker {
  trackFile(file: string, linesOfCode: number): void
  updateFile(file: string, newLinesOfCode: number): void
  removeFile(file: string): void
  getTotalLinesOfCode(): number
  getFiles(): IFileTracker
}

export interface ICodeMetrics {
  totalLinesOfCode: number
  files: IFileTracker
}
