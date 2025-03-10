
import React from 'react';
import { HardDrive } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriveSelectorProps {
  drives: string[];
  selectedDrive: string | null;
  onSelectDrive: (drive: string) => void;
  isScanning: boolean;
  className?: string;
}

const DriveSelector: React.FC<DriveSelectorProps> = ({
  drives,
  selectedDrive,
  onSelectDrive,
  isScanning,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-lg font-medium">Select Drive</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {drives.map((drive) => (
          <button
            key={drive}
            onClick={() => !isScanning && onSelectDrive(drive)}
            disabled={isScanning}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 hover:shadow-md group",
              selectedDrive === drive 
                ? "ring-2 ring-primary border-primary/50 bg-primary/5" 
                : "hover:border-primary/30 hover:bg-secondary/50",
              isScanning && "opacity-50 cursor-not-allowed"
            )}
          >
            <div 
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all",
                selectedDrive === drive 
                  ? "bg-primary/10" 
                  : "bg-secondary group-hover:bg-primary/5"
              )}
            >
              <HardDrive 
                className={cn(
                  "h-8 w-8 transition-colors",
                  selectedDrive === drive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"
                )} 
              />
            </div>
            <span className="text-sm font-medium">{drive}</span>
            {selectedDrive === drive && isScanning && (
              <span className="text-xs text-muted-foreground mt-1 animate-pulse">Scanning...</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DriveSelector;
