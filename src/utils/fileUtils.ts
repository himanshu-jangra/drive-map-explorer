export type FileType = 'file' | 'folder';

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  size?: number;
  format?: string;
  children?: FileNode[];
  path: string;
  handle?: FileSystemHandle; // Added for real file system access
}

// Format bytes to human-readable size
export function formatFileSize(bytes: number | undefined): string {
  if (bytes === undefined) return '';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// Extract file extension
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
}

// Check if the File System Access API is available
export function isFileSystemAccessSupported(): boolean {
  return 'showDirectoryPicker' in window;
}

// Scan a real directory from user's file system
export async function scanRealDirectory(directoryHandle: FileSystemDirectoryHandle, path = ''): Promise<FileNode> {
  const node: FileNode = {
    id: path || directoryHandle.name,
    name: directoryHandle.name,
    type: 'folder',
    path: path || directoryHandle.name,
    handle: directoryHandle,
    children: []
  };

  const entries = [];
  try {
    for await (const entry of directoryHandle.values()) {
      entries.push(entry);
    }
  } catch (error) {
    console.error("Error reading directory contents:", error);
    return node;
  }

  const childPromises = entries.map(async (entry) => {
    const childPath = path ? `${path}/${entry.name}` : entry.name;
    
    if (entry.kind === 'directory') {
      try {
        return await scanRealDirectory(entry as FileSystemDirectoryHandle, childPath);
      } catch (error) {
        console.error(`Error scanning subdirectory ${entry.name}:`, error);
        return {
          id: childPath,
          name: entry.name,
          type: 'folder',
          path: childPath,
          handle: entry,
          children: []
        };
      }
    } else {
      try {
        const fileHandle = entry as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        
        return {
          id: childPath,
          name: entry.name,
          type: 'file',
          size: file.size,
          format: getFileExtension(entry.name),
          path: childPath,
          handle: entry
        };
      } catch (error) {
        console.error(`Error processing file ${entry.name}:`, error);
        return {
          id: childPath,
          name: entry.name,
          type: 'file',
          path: childPath,
          handle: entry
        };
      }
    }
  });

  node.children = await Promise.all(childPromises);
  return node;
}

// Mock function to simulate file system scanning (keep for fallback)
export function mockScanDrive(driveName: string): FileNode {
  // Root node representing the drive
  const root: FileNode = {
    id: driveName,
    name: driveName,
    type: 'folder',
    path: driveName,
    children: []
  };
  
  // Generate a mock file structure for demo purposes
  const folders = ['Documents', 'Pictures', 'Music', 'Videos', 'Downloads'];
  
  const documentFiles = [
    { name: 'Resume.pdf', size: 2450000, format: 'pdf' },
    { name: 'Report.docx', size: 1800000, format: 'docx' },
    { name: 'Notes.txt', size: 12000, format: 'txt' },
    { name: 'Presentation.pptx', size: 5200000, format: 'pptx' }
  ];
  
  const pictureFiles = [
    { name: 'Vacation.jpg', size: 3800000, format: 'jpg' },
    { name: 'Family.png', size: 4200000, format: 'png' },
    { name: 'Profile.jpeg', size: 2100000, format: 'jpeg' }
  ];
  
  const musicFiles = [
    { name: 'Favorite Song.mp3', size: 8400000, format: 'mp3' },
    { name: 'Album.flac', size: 28000000, format: 'flac' },
    { name: 'Playlist.m4a', size: 15000000, format: 'm4a' }
  ];
  
  const videoFiles = [
    { name: 'Holiday.mp4', size: 185000000, format: 'mp4' },
    { name: 'Tutorial.mkv', size: 240000000, format: 'mkv' },
    { name: 'Movie.avi', size: 1240000000, format: 'avi' }
  ];
  
  const downloadFiles = [
    { name: 'Software.exe', size: 45000000, format: 'exe' },
    { name: 'Archive.zip', size: 22000000, format: 'zip' },
    { name: 'Setup.msi', size: 32000000, format: 'msi' }
  ];
  
  const filesByFolder = {
    Documents: documentFiles,
    Pictures: pictureFiles,
    Music: musicFiles,
    Videos: videoFiles,
    Downloads: downloadFiles
  };
  
  // Add folders and files to the root
  root.children = folders.map(folderName => {
    const folder: FileNode = {
      id: `${driveName}/${folderName}`,
      name: folderName,
      type: 'folder',
      path: `${driveName}/${folderName}`,
      children: []
    };
    
    // Add files to the folder
    const files = filesByFolder[folderName as keyof typeof filesByFolder] || [];
    folder.children = files.map(file => ({
      id: `${driveName}/${folderName}/${file.name}`,
      name: file.name,
      type: 'file',
      size: file.size,
      format: file.format,
      path: `${driveName}/${folderName}/${file.name}`
    }));
    
    // Add subfolders for Documents
    if (folderName === 'Documents') {
      const subfolders = ['Work', 'Personal', 'Projects'];
      
      subfolders.forEach(subfolder => {
        folder.children?.push({
          id: `${driveName}/${folderName}/${subfolder}`,
          name: subfolder,
          type: 'folder',
          path: `${driveName}/${folderName}/${subfolder}`,
          children: [
            {
              id: `${driveName}/${folderName}/${subfolder}/File1.pdf`,
              name: 'File1.pdf',
              type: 'file',
              size: 1200000,
              format: 'pdf',
              path: `${driveName}/${folderName}/${subfolder}/File1.pdf`,
            },
            {
              id: `${driveName}/${folderName}/${subfolder}/File2.docx`,
              name: 'File2.docx',
              type: 'file',
              size: 950000,
              format: 'docx',
              path: `${driveName}/${folderName}/${subfolder}/File2.docx`,
            }
          ]
        });
      });
    }
    
    return folder;
  });
  
  return root;
}

// Filter files by search query
export function filterFileTreeByQuery(node: FileNode, query: string): FileNode | null {
  if (!query.trim()) return node;
  
  // Check if current node matches search
  const matchesSearch = node.name.toLowerCase().includes(query.toLowerCase());
  
  // For files, return if it matches or return null
  if (node.type === 'file') {
    return matchesSearch ? { ...node } : null;
  }
  
  // For folders, also check children
  const matchingChildren = node.children
    ? node.children
        .map(child => filterFileTreeByQuery(child, query))
        .filter(Boolean) as FileNode[]
    : [];
  
  // If this folder matches or has matching children, return it with only matching children
  if (matchesSearch || matchingChildren.length > 0) {
    return {
      ...node,
      children: matchingChildren
    };
  }
  
  return null;
}
