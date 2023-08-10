import { codeTrackerInstance } from './lib/tracker'
import type { ICodeMetrics } from './types'
// Utility functions to use with the CodeTracker class

export function trackCodeUsage(file: string, linesOfCode: number) {
  codeTrackerInstance.trackFile(file, linesOfCode)
}

export function updateCodeUsage(file: string, newLinesOfCode: number) {
  codeTrackerInstance.updateFile(file, newLinesOfCode)
}

export function removeCodeUsage(file: string) {
  codeTrackerInstance.removeFile(file)
}

export function getCodeMetrics(): ICodeMetrics {
  return {
    totalLinesOfCode: codeTrackerInstance.getTotalLinesOfCode(),
    files: codeTrackerInstance.getFiles(),
  }
}
