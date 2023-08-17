import { codeTrackerInstance } from './lib/tracker'
import type { ICodeMetrics } from './types'
// Utility functions to use with the CodeTracker class

export async function trackCodeUsage(file: string) {
  await codeTrackerInstance.trackFile(file)
}

export async function updateCodeUsage(file: string) {
  await codeTrackerInstance.updateFile(file)
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
