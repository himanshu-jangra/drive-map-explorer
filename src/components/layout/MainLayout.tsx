
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  onSearch?: (query: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className,
  onSearch
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header onSearch={onSearch} />
      <main className={cn(
        "flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto animate-fade-in",
        className
      )}>
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t">
        <p>Drive Map Explorer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default MainLayout;
