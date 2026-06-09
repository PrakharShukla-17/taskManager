import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search tasks...' }) => {
  const [local, setLocal] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setLocal(value); }, [value]);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocal(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(v), 350);
  };

  return (
    <div id="search-bar" className="relative flex-1 max-w-md">
      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
      <input
        type="text"
        className="input-field pl-10 pr-9 py-2.5 text-sm"
        placeholder={placeholder}
        value={local}
        onChange={handle}
      />
      {local && (
        <button onClick={() => { setLocal(''); onChange(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors">
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
