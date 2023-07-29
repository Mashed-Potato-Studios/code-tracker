import codeTrackerInstance from "./lib/tracker";
// Utility functions to use with the CodeTracker class

export function trackCodeUsage(file: string, linesOfCode: number) {
  codeTrackerInstance.trackFile(file, linesOfCode);
}

export function updateCodeUsage(file: string, newLinesOfCode: number) {
  codeTrackerInstance.updateFile(file, newLinesOfCode);
}

export function removeCodeUsage(file: string) {
  codeTrackerInstance.removeFile(file);
}

export function getCodeMetrics(): {
  totalLinesOfCode: number,
  files: { [file: string]: number },
} {
  return {
    totalLinesOfCode: codeTrackerInstance.getTotalLinesOfCode(),
    files: codeTrackerInstance.getFiles(),
  };
}
