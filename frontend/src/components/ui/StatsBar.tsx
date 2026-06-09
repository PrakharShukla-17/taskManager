import React from 'react';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

interface StatsBarProps { stats: { total: number; pending: number; completed: number }; }

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const items = [
    { label: 'Total',     value: stats.total,     icon: ListTodo,     color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20'  },
    { label: 'Pending',   value: stats.pending,   icon: Clock,        color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20'  },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400',   bg: 'bg-green-50 dark:bg-green-900/20'    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="card p-3 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={17} className={color} />
          </div>
          <div>
            <p className="text-xl font-bold text-navy-900 dark:text-slate-100 leading-none">{value}</p>
            <p className="text-xs text-navy-500 dark:text-navy-400 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
