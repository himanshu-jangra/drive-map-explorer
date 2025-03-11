
# Drive Map Explorer

![Drive Map Explorer](https://github.com/username/drive-map-explorer/raw/main/public/og-image.png)

A lightweight, interactive file system visualization tool that helps you explore and understand your drive structure. You can view mock drive data or access real files from your actual file system (in supported browsers).

## Features

- **Real File System Access**: Access and browse your actual files and folders (in supporting browsers)
- **Drive Selection**: Choose from available drives to explore
- **Interactive File Tree**: Expandable/collapsible folders for easy navigation
- **File Size Information**: View file sizes in human-readable format
- **Search Functionality**: Quickly find files and folders across your drive
- **Structure Export**: Download your file system structure as a text document
- **Responsive Design**: Works on desktop and mobile devices

## Browser Compatibility

Real file system access requires a browser that supports the File System Access API:
- Chrome 86 or later
- Edge 86 or later
- Opera 72 or later

Other browsers will still work, but will use mock data instead of real file access.

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

1. **Select a Drive**: 
   - Choose "Access Real Files" to browse your actual file system (in supported browsers)
   - Or click on one of the mock drives to explore simulated data
2. **Navigate the File Tree**: 
   - Click the arrows to expand/collapse folders
   - Hover over items to see additional details
3. **Search for Files**: Use the search box in the header to find specific files or folders
4. **Export File Structure**: Click the "Download Structure" button to save the current file structure as a text file

## Security Note

When accessing real files, Drive Map Explorer:
- Only requests read permission to your files
- Can only access folders you specifically select
- Cannot modify, delete, or upload any files
- Processes all data locally in your browser (no data is sent to any server)

## Implementation Details

The app is built with:

- **React** for UI components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **File System Access API** for accessing real file system data
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
└── utils/           # Utility functions including file system access
```

## License

[MIT](LICENSE)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/drive-map-explorer/issues).

## Acknowledgements

- [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) for secure file system access
- [Lucide Icons](https://lucide.dev/) for beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Shadcn UI](https://ui.shadcn.com/) for accessible UI components
