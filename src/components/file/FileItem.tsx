
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
}

const FileItem: React.FC<FileItemProps> = ({
  node,
  expanded,
  onToggle,
  depth = 0,
  isLast = false,
  isSearchResult = false
}) => {
  const { name, type, size, format, children } = node;
  const hasChildren = children && children.length > 0;
  
  // Function to get icon color based on file type
  const getIconColor = (fileFormat?: string) => {
    if (!fileFormat) return 'currentColor';
    
    // Color mapping for different file types
    const colorMap: Record<string, string> = {
      pdf: 'text-red-500',
      doc: 'text-blue-500',
      docx: 'text-blue-500',
      xls: 'text-green-500',
      xlsx: 'text-green-500',
      ppt: 'text-orange-500',
      pptx: 'text-orange-500',
      jpg: 'text-purple-500',
      jpeg: 'text-purple-500',
      png: 'text-purple-500',
      gif: 'text-purple-500',
      mp3: 'text-pink-500',
      mp4: 'text-indigo-500',
      zip: 'text-yellow-600',
      rar: 'text-yellow-600',
      txt: 'text-gray-500',
    };
    
    return colorMap[fileFormat] || 'currentColor';
  };

  return (
    <div 
      className={cn(
        "tree-node group",
        isSearchResult && "bg-yellow-50 hover:bg-yellow-100/60",
        depth === 0 && "mt-1"
      )}
    >
      <div className="tree-node-content">
        {type === 'folder' && hasChildren && (
          <button
            onClick={onToggle}
            className="flex-shrink-0 h-5 w-5 rounded hover:bg-secondary flex items-center justify-center transition-colors"
            aria-label={expanded ? "Collapse folder" : "Expand folder"}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
        {type === 'folder' && !hasChildren && <div className="w-5" />}
        {type === 'file' && <div className="w-5" />}
        
        {type === 'folder' ? (
          <Folder className="file-icon text-blue-500" />
        ) : (
          <File className={cn("file-icon", getIconColor(format))} />
        )}
        
        <span className="file-name">
          {name}
        </span>
        
        {type === 'file' && (
          <div className="flex items-center gap-2 file-meta">
            {format && <span className="uppercase px-1.5 py-0.5 rounded bg-secondary text-xs">{format}</span>}
            {size !== undefined && <span>{formatFileSize(size)}</span>}
          </div>
        )}
        
        {type === 'folder' && hasChildren && (
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {children?.length} {children?.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="tree-children">
          {children?.map((child, index) => {
            // Import FileTree dynamically to avoid circular dependencies
            const { FileTree } = require('./FileTree');
            return (
              <FileTree
                key={child.id}
                node={child}
                depth={depth + 1}
                isLast={index === children.length - 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileItem;
