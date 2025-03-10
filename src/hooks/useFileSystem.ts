
import { useState, useCallback } from 'react';
import { FileNode, mockScanDrive, filterFileTreeByQuery } from '@/utils/fileUtils';

export function useFileSystem() {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [filteredTree, setFilteredTree] = useState<FileNode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Available drives (in a real app, this would be fetched from the OS)
  const availableDrives = ['C:', 'D:', 'E:', 'External Drive'];

  const scanDrive = useCallback((driveName: string) => {
    setError(null);
    setIsScanning(true);
    
    // Simulate an async operation
    setTimeout(() => {
      try {
        const result = mockScanDrive(driveName);
        setFileTree(result);
        setFilteredTree(result);
        setSelectedDrive(driveName);
        setIsScanning(false);
      } catch (err) {
        setError(`Failed to scan drive: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsScanning(false);
      }
    }, 1500); // Simulate scan time
  }, []);

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
    searchQuery
  };
}
