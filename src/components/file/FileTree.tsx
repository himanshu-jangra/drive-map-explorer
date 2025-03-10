
import React, { useState, useEffect } from 'react';
import { FileNode } from '@/utils/fileUtils';
import FileItem from './FileItem';
import { cn } from '@/lib/utils';

interface FileTreeProps {
  node: FileNode;
  depth?: number;
  isLast?: boolean;
  expandAll?: boolean;
  searchQuery?: string;
}

export const FileTree: React.FC<FileTreeProps> = ({
  node,
  depth = 0,
  isLast = false,
  expandAll = false,
  searchQuery = '',
}) => {
  const [expanded, setExpanded] = useState(expandAll || depth < 1);
  
  useEffect(() => {
    // Auto expand if we're searching and this is a parent with matching children
    if (searchQuery && node.type === 'folder') {
      setExpanded(true);
    }
  }, [searchQuery, node.type]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const isSearchResult = searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <FileItem
      node={node}
      expanded={expanded}
      onToggle={handleToggle}
      depth={depth}
      isLast={isLast}
      isSearchResult={isSearchResult}
    />
  );
};

interface FileTreeContainerProps {
  root: FileNode | null;
  className?: string;
  searchQuery?: string;
}

const FileTreeContainer: React.FC<FileTreeContainerProps> = ({
  root,
  className,
  searchQuery = '',
}) => {
  if (!root) {
    return (
      <div className="tree-container flex items-center justify-center p-8">
        <p className="text-muted-foreground">Select a drive to view its file structure</p>
      </div>
    );
  }

  return (
    <div className={cn("tree-container overflow-auto max-h-[70vh]", className)}>
      <FileTree node={root} searchQuery={searchQuery} />
    </div>
  );
};

export default FileTreeContainer;
