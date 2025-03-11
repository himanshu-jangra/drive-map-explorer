
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DriveSelector from '@/components/drive/DriveSelector';
import FileTreeContainer from '@/components/file/FileTree';
import { useFileSystem } from '@/hooks/useFileSystem';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

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
    searchQuery,
    fsSupported,
    usingRealFS
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
            {fsSupported 
              ? "Select a drive or access real files from your device" 
              : "Select a drive to visualize file system structure (using mock data)"}
          </p>
        </section>

        {!fsSupported && (
          <Alert variant="default" className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>File System Access Unavailable</AlertTitle>
            <AlertDescription>
              Your browser doesn't support the File System Access API. 
              Using Chrome or Edge would enable accessing real files from your device.
            </AlertDescription>
          </Alert>
        )}

        <DriveSelector
          drives={availableDrives}
          selectedDrive={selectedDrive}
          onSelectDrive={handleDriveSelect}
          isScanning={isScanning}
          fsSupported={fsSupported}
          className="mb-6"
        />

        {isScanning ? (
          <div className="border rounded-lg p-8 flex flex-col items-center justify-center gap-4 animate-pulse">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-muted-foreground">Scanning {selectedDrive}...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {usingRealFS && (
              <Alert variant="default" className="mb-4">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Viewing Real Files</AlertTitle>
                <AlertDescription>
                  You're now browsing actual files from your device. The application only has read 
                  access and cannot modify any files.
                </AlertDescription>
              </Alert>
            )}
            
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
