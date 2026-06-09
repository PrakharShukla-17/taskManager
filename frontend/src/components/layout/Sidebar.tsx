import React from 'react';
import { LayoutDashboard, CheckCircle2, Clock, LogOut, User, ListTodo } from 'lucide-react';
import { TaskFilter } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  stats: { total: number; pending: number; completed: number };
}

const Sidebar: React.FC<SidebarProps> = ({ activeFilter, onFilterChange, stats }) => {
  const { user, logout } = useAuth();
  const navItems = [
    { id: 'all' as TaskFilter,       label: 'All Tasks',  icon: ListTodo,     count: stats.total     },
    { id: 'pending' as TaskFilter,   label: 'Pending',    icon: Clock,        count: stats.pending   },
    { id: 'completed' as TaskFilter, label: 'Completed',  icon: CheckCircle2, count: stats.completed },
  ];

  return (
    <aside id="sidebar" className="w-60 flex-shrink-0 h-screen sticky top-0 flex flex-col bg-navy-900 dark:bg-navy-950 border-r border-navy-800">
      <div className="px-5 py-5 border-b border-navy-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-base tracking-tight">TaskManager</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <p className="text-[10px] font-semibold text-navy-500 uppercase tracking-widest px-3 mb-2 mt-1">
          Filter Tasks
        </p>
        {navItems.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeFilter === id
                ? 'bg-accent-600 text-white'
                : 'text-navy-300 hover:bg-navy-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Icon size={16} />
              {label}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              activeFilter === id ? 'bg-white/20 text-white' : 'bg-navy-800 text-navy-400'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-navy-800">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-navy-800">
          <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs text-navy-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-navy-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
