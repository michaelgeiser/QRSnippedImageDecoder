# QR Code Decoder Chrome Extension

## Overview
This Chrome extension allows users to quickly decode QR codes found in images on web pages. With a simple right-click context menu option, users can extract information from QR codes without leaving their current webpage.

## Features
- Right-click context menu integration for easy access
- Works with any image containing a QR code
- Instant QR code decoding
- Clean user interface
- No external server dependencies

## Installation
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon should appear in your Chrome toolbar

## Usage
1. Find an image containing a QR code on any webpage
2. Right-click the image
3. Select "Decode QR Code" from the context menu
4. The decoded content will be displayed in a popup

## Technical Details
The extension consists of several key components:
- Background Service Worker: Manages context menus and extension lifecycle
- Content Script: Handles image processing and QR code detection
- Popup Interface: Displays decoded results
- Manifest V3 compliant

## Requirements
- Google Chrome Browser (Version 88 or higher)
- Images must be accessible and loaded in the webpage

## Permissions
This extension requires the following permissions:
- `contextMenus`: For the right-click menu functionality
- `activeTab`: To access the current tab's content

## Development
To modify or enhance the extension:
1. Make changes to the source files
2. Reload the extension in `chrome://extensions/`
3. Test your changes



### Project Structure
```
extension/
├── LICENSE
├── README.md
├── manifest.json
├── apps/
│ ├── background.js
│ ├── mgqrparser.html
│ ├── mgqrparser.css
│ └── mgqrparser.js
└── images/
│ ├── GeiserSoft.svg
│ ├── icon-16.png
│ ├── icon-48.png
│ └── icon-128.png
```

## Troubleshooting
Common issues and solutions:
- If the context menu option doesn't appear, try reloading the extension
- Ensure the image is fully loaded before attempting to decode
- Check the console for any error messages

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Privacy
This extension:
- Does not collect any personal data
- Processes all QR codes locally
- Does not send any information to external servers

## Support
For bugs, questions, and discussions please use the GitHub Issues page.

## Version History
- 1.0.0: Initial release
  - Basic QR code decoding functionality
  - Context menu integration
  - Popup interface for results

