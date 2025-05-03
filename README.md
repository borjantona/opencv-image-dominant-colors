![CI Status](https://github.com/borjantona/opencv-image-dominant-colors/actions/workflows/CI.yml/badge.svg)

# OpenCV Image Dominant Colors

Extract and analyze the dominant colors from any image using OpenCV and React.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Live Demo

Check out the deployed app on Netlify:  
👉 **[OpenCV Image Processor](https://open-cv-dominant-colors.netlify.app/)**

## Features

- Extracts dominant colors from images using k-means clustering.
- Lets you choose the number of dominant colors to extract.
- Fast, intuitive, and user-friendly interface.
- All processing happens in your browser—no images are uploaded to any server.

## Installation

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/borjantona/opencv-image-dominant-colors.git
cd opencv-image-dominant-colors
npm install
npm run dev
```

## Usage

1. Open the app in your browser.
2. Upload an image from your device.
3. Select how many dominant colors you want to extract.
4. Instantly see the generated color palette.

## Examples

Here are some examples of processed images and their extracted color palettes:

| 📷  |
|---|
| ![image](https://github.com/user-attachments/assets/a192acc1-5054-4df5-ad5d-a4397a0b9f39) |
| ![image](https://github.com/user-attachments/assets/a6d64a72-705a-4973-be2e-366aa5a3d42b) |
| ![image](https://github.com/user-attachments/assets/c5308615-1060-4de4-be39-19bfa1f6974b) |

## Tech Stack

- **[OpenCV](https://opencv.org/):** Computer vision algorithms.
- **[React](https://react.dev/):** User interface.
- **[Vite](https://vite.dev/):** Fast frontend build tool.
- **[Vitest](https://vitest.dev/):** Testing framework.

## Contributing

Contributions are welcome!  
Feel free to open an issue or submit a pull request for suggestions or improvements.

## License

[MIT](LICENSE)
