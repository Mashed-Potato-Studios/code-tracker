# Focusing Library

Focus-Mode is a lightweight JavaScript library that helps track the amount of code developers write in a project. It allows you to monitor the lines of code in individual files and provides an overall count of lines of code for the entire project.

## Installation

You can install the Focusing library via NPM or Yarn:

```bash
npm install focusing-library --save
```

or

```bash
yarn add focusing-library
```

## Usage

### Tracking Code Usage

To track the lines of code in a file, you can use the `trackCodeUsage` function. For example:

```javascript
import { trackCodeUsage } from 'focusing-library';

const file = 'example.js';
const linesOfCode = 50;

trackCodeUsage(file, linesOfCode);
```

### Updating Code Usage

If you need to update the number of lines of code in a file, use the `updateCodeUsage` function:

```javascript
import { updateCodeUsage } from 'focusing-library';

const file = 'example.js';
const newLinesOfCode = 75;

updateCodeUsage(file, newLinesOfCode);
```

### Removing Code Usage

To stop tracking a file and remove it from the metrics, you can use the `removeCodeUsage` function:

```javascript
import { removeCodeUsage } from 'focusing-library';

const file = 'example.js';

removeCodeUsage(file);
```

### Getting Code Metrics

You can retrieve the overall lines of code and a dictionary of tracked files using the `getCodeMetrics` function:

```javascript
import { getCodeMetrics } from 'focusing-library';

const metrics = getCodeMetrics();
console.log(metrics.totalLinesOfCode); // Output: Total lines of code in the project
console.log(metrics.files); // Output: Dictionary of tracked files and their respective lines of code
```

## Example

Here's a basic example of how you might use the Focusing library in a project:

```javascript
import { trackCodeUsage, getCodeMetrics } from 'focusing-library';

const files = [
  { name: 'index.js', linesOfCode: 120 },
  { name: 'utils.js', linesOfCode: 50 },
  // Add more files as needed
];

// Track code usage for each file
files.forEach(({ name, linesOfCode }) => {
  trackCodeUsage(name, linesOfCode);
});

// Get code metrics
const metrics = getCodeMetrics();
console.log(metrics.totalLinesOfCode); // Output: Total lines of code in the project
console.log(metrics.files); // Output: Dictionary of tracked files and their respective lines of code
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! If you find a bug or want to suggest an enhancement, please [create an issue](https://github.com/titan/focusing-library/issues) or submit a pull request.

