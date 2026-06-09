import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle2, Circle, Calendar, Flag } from 'lucide-react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  low:    { label: 'Low',    classes: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'     },
  medium: { label: 'Medium', classes: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  high:   { label: 'High',   classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'             },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [toggling, setToggling] = useState(false);
  const priority = priorityConfig[task.priority];
  const isDone = task.status === 'completed';
  const isOverdue = task.dueDate && !isDone && new Date(task.dueDate) < new Date();

  const handleToggle = async () => {
    setToggling(true);
    await onToggle(task._id);
    setToggling(false);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className={`task-card card p-4 flex flex-col gap-3 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 animate-slide-up ${isDone ? 'opacity-75' : ''}`}>
      {/* Header row */}
      
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <button
            onClick={handleToggle}
            disabled={toggling}
            className="mt-0.5 flex-shrink-0 text-navy-400 hover:text-accent-500 transition-colors"
          >
            {isDone ? <CheckCircle2 size={18} className="text-green-500" /> : <Circle size={18} />}
          </button>
          <h3 className={`font-semibold text-sm leading-snug ${isDone ? 'line-through text-navy-400 dark:text-navy-500' : 'text-navy-900 dark:text-slate-100'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-md hover:bg-navy-100 dark:hover:bg-navy-800 text-navy-400 hover:text-accent-600 transition-all"
            title="Edit"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-navy-400 hover:text-red-500 transition-all"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-navy-500 dark:text-navy-400 leading-relaxed line-clamp-2 pl-6">
          {task.description}
        </p>
      )}

      {/* Badges + due date */}
      <div className="flex items-center justify-between gap-2 pt-0.5 pl-6">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`badge ${priority.classes} flex items-center gap-1`}>
            <Flag size={9} />{priority.label}
          </span>
          <span className={`badge ${isDone
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
            {isDone ? 'Done' : 'Pending'}
          </span>
        </div>
        {task.dueDate && (
          <div className={`flex items-center gap-1 text-xs flex-shrink-0 ${isOverdue ? 'text-red-500' : 'text-navy-400 dark:text-navy-500'}`}>
            <Calendar size={11} /><span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Toggle button */}
      <button
        onClick={handleToggle}
        disabled={toggling}
        className={`w-full text-xs py-1.5 rounded-lg font-medium transition-all duration-200 active:scale-95 ${
          isDone
            ? 'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-200 dark:hover:bg-navy-700'
            : 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 hover:bg-accent-100 border border-accent-200 dark:border-accent-800'
        }`}
      >
        {toggling ? '...' : isDone ? 'Mark as Pending' : 'Mark as Done'}
      </button>
    </div>
  );
};

export default TaskCard;
