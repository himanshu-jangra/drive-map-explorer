
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DriveSelector from '@/components/drive/DriveSelector';
import FileTreeContainer from '@/components/file/FileTree';
import { useFileSystem } from '@/hooks/useFileSystem';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const { 
    availableDrives,
    selectedDrive,
    fileTree,
    isScanning,
    error,
    scanDrive,
    searchFiles,
    searchQuery
  } = useFileSystem();

  // Handle errors with toast
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleDriveSelect = (drive: string) => {
    scanDrive(drive);
  };

  const handleSearch = (query: string) => {
    searchFiles(query);
  };

  return (
    <MainLayout onSearch={handleSearch}>
      <div className="space-y-6 animate-fade-in">
        <section className="text-left max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Drive Map Explorer</h1>
          <p className="text-muted-foreground">
            Select a drive to visualize your file system structure
          </p>
        </section>

        <DriveSelector
          drives={availableDrives}
          selectedDrive={selectedDrive}
          onSelectDrive={handleDriveSelect}
          isScanning={isScanning}
          className="mb-6"
        />

        {isScanning ? (
          <div className="border rounded-lg p-8 flex flex-col items-center justify-center gap-4 animate-pulse">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-muted-foreground">Scanning {selectedDrive}...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {searchQuery && fileTree && (
              <div className="mb-4 text-sm text-left">
                <span className="font-medium">Search results for:</span>{" "}
                <span className="text-primary">{searchQuery}</span>
              </div>
            )}
            <FileTreeContainer 
              root={fileTree} 
              searchQuery={searchQuery}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
