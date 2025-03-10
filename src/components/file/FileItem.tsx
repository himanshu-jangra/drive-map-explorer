
import React from 'react';
import { FileNode, formatFileSize } from '@/utils/fileUtils';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItemProps {
  node: FileNode;
  expanded: boolean;
  onToggle: () => void;
  depth?: number;
  isLast?: boolean;
  isSearchResult?: boolean;
  renderChildren?: (node: FileNode, index: number) => React.ReactNode;
}

const FileItem: React.FC<FileItemProps> = ({
  node,
  expanded,
  onToggle,
  depth = 0,
  isLast = false,
  isSearchResult = false,
  renderChildren
}) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn("text-left", isSearchResult && "bg-yellow-50 hover:bg-yellow-100/60")}>
      <div className="tree-node">
        <div className="tree-node-content">
          {node.type === 'folder' && hasChildren && (
            <button
              onClick={onToggle}
              className="flex-shrink-0 h-5 w-5 rounded hover:bg-secondary flex items-center justify-center transition-colors"
              aria-label={expanded ? "Collapse folder" : "Expand folder"}
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          )}
          {(node.type === 'folder' && !hasChildren || node.type === 'file') && <div className="w-5" />}
          
          {node.type === 'folder' ? (
            <Folder className="file-icon text-blue-500" />
          ) : (
            <File className="file-icon text-gray-500" />
          )}
          
          <span className="file-name">
            {node.name}
          </span>
          
          {node.type === 'file' && node.size && (
            <span className="file-meta">
              {formatFileSize(node.size)}
            </span>
          )}
        </div>
      </div>
      
      {expanded && hasChildren && renderChildren && (
        <div className="tree-children">
          {node.children.map((child, index) => renderChildren(child, index))}
        </div>
      )}
    </div>
  );
};

export default FileItem;
