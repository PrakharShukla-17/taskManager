import React from 'react';
import { ClipboardList, Search } from 'lucide-react';

interface EmptyStateProps { isSearch?: boolean; filter?: string; onCreateTask?: () => void; }

const EmptyState: React.FC<EmptyStateProps> = ({ isSearch, filter, onCreateTask }) => {
  if (isSearch) return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center mb-4">
        <Search size={24} className="text-navy-400 dark:text-navy-500" />
      </div>
      <h3 className="font-semibold text-navy-700 dark:text-navy-300 mb-1">No results found</h3>
      <p className="text-sm text-navy-400 dark:text-navy-500 max-w-xs">Try adjusting your search term.</p>
    </div>
  );
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-navy-100 dark:bg-navy-800 flex items-center justify-center mb-4">
        <ClipboardList size={24} className="text-navy-400 dark:text-navy-500" />
      </div>
      <h3 className="font-semibold text-navy-700 dark:text-navy-300 mb-1">
        {filter === 'completed' ? 'No completed tasks yet' : filter === 'pending' ? 'No pending tasks' : 'No tasks yet'}
      </h3>
      <p className="text-sm text-navy-400 dark:text-navy-500 max-w-xs mb-4">
        {filter === 'completed' ? 'Complete some tasks and they will appear here.' : filter === 'pending' ? 'All tasks are done! 🎉' : 'Create your first task to get started.'}
      </p>
      {filter !== 'completed' && onCreateTask && (
        <button onClick={onCreateTask} className="btn-primary text-sm">+ Create Task</button>
      )}
    </div>
  );
};

export default EmptyState;
