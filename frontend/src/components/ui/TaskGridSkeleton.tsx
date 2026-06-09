import React from 'react';

const TaskSkeleton = () => (
  <div className="card p-4 flex flex-col gap-3 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-2 flex-1">
        <div className="w-4 h-4 rounded-full bg-navy-200 dark:bg-navy-700 mt-0.5" />
        <div className="h-4 bg-navy-200 dark:bg-navy-700 rounded w-3/4" />
      </div>
      <div className="flex gap-1">
        <div className="w-6 h-6 rounded bg-navy-200 dark:bg-navy-700" />
        <div className="w-6 h-6 rounded bg-navy-200 dark:bg-navy-700" />
      </div>
    </div>
    <div className="space-y-1.5 pl-6">
      <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded w-full" />
      <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded w-2/3" />
    </div>
    <div className="flex items-center justify-between pl-6">
      <div className="flex gap-2">
        <div className="h-5 w-14 rounded-full bg-navy-200 dark:bg-navy-700" />
        <div className="h-5 w-16 rounded-full bg-navy-200 dark:bg-navy-700" />
      </div>
      <div className="h-3 w-20 rounded bg-navy-200 dark:bg-navy-700" />
    </div>
    <div className="h-7 rounded-lg bg-navy-100 dark:bg-navy-800" />
  </div>
);

const TaskGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => <TaskSkeleton key={i} />)}
  </div>
);

export default TaskGridSkeleton;
