
import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  delay?: number;
}

export const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  onSearch,
  className,
  delay = 300
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      onSearch?.(value);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay, onSearch]);

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div 
      className={cn(
        "relative flex items-center w-full rounded-full border bg-background px-3 py-1.5 transition-all duration-200",
        isFocused && "ring-1 ring-ring border-primary",
        className
      )}
    >
      <SearchIcon className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm"
      />
      {value && (
        <button 
          onClick={handleClear}
          className="flex items-center justify-center h-5 w-5 rounded-full hover:bg-muted flex-shrink-0 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
