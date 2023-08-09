import { CodeTracker } from '../src/lib/tracker'
import { expect, test, describe, beforeEach } from 'vitest'

describe('tracker', () => {
  let codeTracker: CodeTracker

  beforeEach(async () => {
    codeTracker = new CodeTracker()
  })

  test('track a file correctly', () => {
    codeTracker.trackFile('file1.ts', 100)
    expect(codeTracker.getTotalLinesOfCode()).toEqual(100)
    expect(codeTracker.getFiles()['file1.ts']).toEqual(100)
  })
  test('should throw error for tracked file already', () => {
    codeTracker.trackFile('file1.ts', 100)
    expect(() => codeTracker.trackFile('file1.ts', 150)).toThrowError(
      'File already tracked'
    )
  })
})
