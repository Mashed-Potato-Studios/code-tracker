class CodeTracker {
  private totalLinesOfCode: number;
  private files: { [file: string]: number };

  constructor() {
    this.totalLinesOfCode = 0;
    this.files = {};
  }

  trackFile(file: string, linesOfCode: number) {
    if (this.files[file]) {
      console.warn(`File "${file}" is already being tracked.`);
      return;
    }

    this.files[file] = linesOfCode;
    this.totalLinesOfCode += linesOfCode;
  }

  updateFile(file: string, newLinesOfCode: number) {
    if (!this.files[file]) {
      console.warn(`File "${file}" is not being tracked.`);
      return;
    }

    const previousLinesOfCode = this.files[file];
    this.totalLinesOfCode -= previousLinesOfCode;
    this.totalLinesOfCode += newLinesOfCode;

    this.files[file] = newLinesOfCode;
  }

  removeFile(file: string) {
    if (!this.files[file]) {
      console.warn(`File "${file}" is not being tracked.`);
      return;
    }

    this.totalLinesOfCode -= this.files[file];
    delete this.files[file];
  }

  getTotalLinesOfCode(): number {
    return this.totalLinesOfCode;
  }

  getFiles(): { [file: string]: number } {
    return this.files;
  }
}

// Singleton pattern to ensure there's only one instance of CodeTracker
const codeTrackerInstance = new CodeTracker();
export default codeTrackerInstance;
