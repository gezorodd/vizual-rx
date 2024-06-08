# VizualRx

https://vizual-rx.vercel.app/

VizualRx is a web app that lets you write RxJS code and visualize it with marble diagrams.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

## Features

- **Interactive Code Editor**: Write and edit RxJS code directly in the browser.
- **Marble Diagrams**: Visualize RxJS observables and operators.
- **Controlled Animation**: Gain full control over animations; pause, stop, or adjust speed at any point.
- **Source of Documentation**: The application provides a page for most RxJS operators and functions, each with a basic example demonstrating how to use them.
- **Code Sharing**: Easily share your RxJS code and visualizations with others.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. Install and run the project:
   ```bash
   npm install
   npm run start
   ```

2. Open your browser and go to `http://localhost:4200` to see the application in action.

## Usage

1. Enter your RxJS code into the editor.
2. Use the built-in `observe` function to create an Observer that will display the values in the diagram.
3. Use the built-in `createValue` function to create visual values with shape and color properties.
4. Click the "Run" button to execute the code.
5. Observe the marble diagram animation based on your code.
6. For further information, visit the [VizualRx Overview](https://vizual-rx.vercel.app/overview).

## Examples

### Example 1: Basic Observable
![vizual-rx-basics](https://github.com/gezorodd/vizual-rx/assets/98316524/03aeb12f-c6e9-42a8-a6d2-e4f6bfe13da5)

### Example 2: Compare Operators
![vizual-rx-compare-operators](https://github.com/gezorodd/vizual-rx/assets/98316524/0385d122-ff3c-428a-a3ef-cdc3fb5ba598)

### Example 3: Break Down a Pipe
![vizual-rx-break-down-a-pipe](https://github.com/gezorodd/vizual-rx/assets/98316524/e610f91c-4ee9-496b-9493-0c375ada2242)
