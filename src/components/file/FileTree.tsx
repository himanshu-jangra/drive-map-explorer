
import React, { useState, useEffect } from 'react';
import { FileNode } from '@/utils/fileUtils';
import FileItem from './FileItem';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const generateTextFileContent = (node: FileNode, depth = 0, isLast = true): string => {
  const indent = '  '.repeat(depth);
  const prefix = depth > 0 ? (isLast ? '└─ ' : '├─ ') : '';
  let content = `${indent}${prefix}${node.name}${node.type === 'file' && node.size ? ` (${formatFileSize(node.size)})` : ''}\n`;
  
  if (node.children && node.children.length > 0) {
    node.children.forEach((child, index) => {
      const childIsLast = index === node.children!.length - 1;
      content += generateTextFileContent(child, depth + 1, childIsLast);
    });
  }
  
  return content;
};

const downloadFileStructure = (node: FileNode) => {
  if (!node) return;
  
  const content = generateTextFileContent(node);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${node.name}-file-structure.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">File Structure</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => downloadFileStructure(root)}
        >
          <Download className="h-4 w-4" /> Download Structure
        </Button>
      </div>
      <div className={cn("tree-container overflow-auto max-h-[70vh] text-left", className)}>
        <FileTree node={root} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

// Import formatFileSize for the download function
import { formatFileSize } from '@/utils/fileUtils';

export default FileTreeContainer;
