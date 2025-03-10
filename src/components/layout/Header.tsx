
import React from 'react';
import { Search } from '../ui/search';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className, onSearch }) => {
  return (
    <header className={cn(
      "sticky top-0 z-10 w-full backdrop-blur-md bg-background/90 border-b py-3 px-4",
      className
    )}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold animate-fade-in">Drive Map Explorer</h1>
          <div className="hidden md:block h-6 w-px bg-border mx-2"></div>
          <p className="hidden md:block text-sm text-muted-foreground animate-fade-in delay-100">
            Visualize your file system
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Search onSearch={onSearch} placeholder="Search files..." />
        </div>
      </div>
    </header>
  );
};

export default Header;
