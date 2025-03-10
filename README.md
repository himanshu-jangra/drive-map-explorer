
# Drive Map Explorer

![Drive Map Explorer](https://github.com/username/drive-map-explorer/raw/main/public/og-image.png)

A lightweight, interactive file system visualization tool that helps you explore and understand your drive structure.

## Features

- **Drive Selection**: Choose from available drives to explore
- **Interactive File Tree**: Expandable/collapsible folders for easy navigation
- **File Size Information**: View file sizes in human-readable format
- **Search Functionality**: Quickly find files and folders across your drive
- **Structure Export**: Download your file system structure as a text document
- **Responsive Design**: Works on desktop and mobile devices

## Demo

This is a demo application that uses mock data to simulate file system exploration. In a production environment, this would connect to real file system APIs.

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/drive-map-explorer.git

# Navigate to the project directory
cd drive-map-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **Select a Drive**: Click on one of the available drives to start exploring
2. **Navigate the File Tree**: 
   - Click the arrows to expand/collapse folders
   - Hover over items to see additional details
3. **Search for Files**: Use the search box in the header to find specific files or folders
4. **Export File Structure**: Click the "Download Structure" button to save the current file structure as a text file

## Implementation Details

The app is built with:

- **React** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **Vite** as the build tool

## Project Structure

```
src/
├── components/
│   ├── drive/       # Drive selection components
│   ├── file/        # File tree visualization components
│   ├── layout/      # Layout components like header and main layout
│   └── ui/          # UI components like buttons, search bars, etc.
├── hooks/           # Custom React hooks
├── pages/           # Page components
└── utils/           # Utility functions
```

## Current Limitations

This is a demo application that uses mock data to simulate file system exploration. It does not actually access your file system. In a real implementation, the following would need to be addressed:

- File system access permissions
- Integration with system APIs
- Performance optimization for large file structures
- Implementation of actual file operations (view, edit, delete, etc.)

## License

[MIT](LICENSE)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/drive-map-explorer/issues).

## Acknowledgements

- [Lucide Icons](https://lucide.dev/) for beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) for accessible UI components
