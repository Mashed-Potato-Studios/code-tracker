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

export interface ICodeTrackerCallbackFn {
  onFileAdded?: (file: string, linesOfCode: number) => void;
  onFileUpdated?: (file: string, newLinesOfCode: number, oldLinesOfCode: number) => void;
    onFileRemoved?: (file: string, linesOfCode: number) => void;
    // onTotalLinesOfCodeChanged?: (newTotalLinesOfCode: number, oldTotalLinesOfCode: number) => void;
}

export interface ICodeMetrics {
  totalLinesOfCode: number
  files: IFileTracker
}
