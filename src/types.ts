//TODO: Add more functional types

// Define an interface for tracking files
export interface IFileTracker {
  [file: string]: number
}

/**
 * @name ICodeTracker - Rename to ITrackingStrategy
 */
export interface ITrackingStrategy {
  trackFile(file: string, linesOfCode: number): void
  updateFile(file: string, newLinesOfCode: number): void
  removeFile(file: string): void
  getTotalLinesOfCode(): number
  getFiles(): IFileTracker
}

export interface IStorageStrategy {
  save(files: IFileTracker, totalLinesOfCode: number): void
  load(): { files: IFileTracker, totalLinesOfCode: number } | null
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
