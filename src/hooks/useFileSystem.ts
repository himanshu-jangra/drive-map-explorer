
import { useState, useCallback } from 'react';
import { 
  FileNode, 
  mockScanDrive, 
  filterFileTreeByQuery,
  isFileSystemAccessSupported,
  scanRealDirectory
} from '@/utils/fileUtils';
import { useToast } from '@/hooks/use-toast';

export function useFileSystem() {
  const { toast } = useToast();
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [filteredTree, setFilteredTree] = useState<FileNode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [usingRealFS, setUsingRealFS] = useState(false);

  // Check if File System Access API is supported
  const fsSupported = isFileSystemAccessSupported();

  // Available drives (in a real app, this would be fetched from the OS)
  const availableDrives = fsSupported 
    ? ['Access Real Files', 'Mock Drive C:', 'Mock Drive D:'] 
    : ['Mock Drive C:', 'Mock Drive D:', 'Mock Drive E:', 'Mock External Drive'];

  const scanDrive = useCallback(async (driveName: string) => {
    setError(null);
    setIsScanning(true);
    
    // Check if this is a request to access real files
    if (driveName === 'Access Real Files' && fsSupported) {
      try {
        // Request permission to access files
        const directoryHandle = await window.showDirectoryPicker({
          mode: 'read'
        });
        
        // Scan the directory
        const result = await scanRealDirectory(directoryHandle);
        setFileTree(result);
        setFilteredTree(result);
        setSelectedDrive(directoryHandle.name);
        setUsingRealFS(true);
        setIsScanning(false);
        
        toast({
          title: "Success",
          description: `Loaded directory: ${directoryHandle.name}`,
        });
      } catch (err) {
        // Handle user cancellation or permission errors
        if (err instanceof Error && err.name === 'AbortError') {
          setError('Directory selection was canceled');
        } else {
          setError(`Failed to access directory: ${err instanceof Error ? err.message : 'Permission denied'}`);
        }
        setIsScanning(false);
        setUsingRealFS(false);
      }
    } else {
      // Use mock data for testing or if File System API is not supported
      setTimeout(() => {
        try {
          const result = mockScanDrive(driveName);
          setFileTree(result);
          setFilteredTree(result);
          setSelectedDrive(driveName);
          setIsScanning(false);
          setUsingRealFS(false);
        } catch (err) {
          setError(`Failed to scan drive: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setIsScanning(false);
        }
      }, 1500); // Simulate scan time
    }
  }, [fsSupported, toast]);

  const searchFiles = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!fileTree) return;
    
    if (!query.trim()) {
      setFilteredTree(fileTree);
      return;
    }
    
    const filtered = filterFileTreeByQuery(fileTree, query);
    setFilteredTree(filtered);
  }, [fileTree]);

  return {
    availableDrives,
    selectedDrive,
    fileTree: filteredTree,
    isScanning,
    error,
    scanDrive,
    searchFiles,
    searchQuery,
    fsSupported,
    usingRealFS
  };
}
