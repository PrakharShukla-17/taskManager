import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Compass } from 'lucide-react';
import { Task, TaskFilter, TaskFormData } from '../types';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import { tourSteps } from '../utils/tourSteps';
import Sidebar from '../components/layout/Sidebar';
import TaskCard from '../components/task/TaskCard';
import TaskModal from '../components/task/TaskModal';
import TaskGridSkeleton from '../components/ui/TaskGridSkeleton';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import SearchBar from '../components/ui/SearchBar';
import StatsBar from '../components/ui/StatsBar';
import TourModal from '../components/tour/TourModal';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { tasks, pagination, isLoading, stats, fetchTasks, fetchStats, createTask, updateTask, deleteTask, toggleStatus } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; task: Task | null }>({ open: false, task: null });
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const load = useCallback(() => {
    fetchTasks({ status: filter, search, page });
  }, [fetchTasks, filter, search, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { fetchStats(); }, [fetchStats, tasks]);
  useEffect(() => { setPage(1); }, [filter, search]);

  const handleCreateTask = async (data: TaskFormData) => {
    const task = await createTask(data);
    if (task) { load(); fetchStats(); }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;
    const task = await updateTask(editingTask._id, data);
    if (task) { load(); fetchStats(); }
  };

  const handleToggle = async (id: string) => {
    const task = await toggleStatus(id);
    if (task) { load(); fetchStats(); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.task) return;
    const ok = await deleteTask(deleteModal.task._id);
    if (ok) {
      setDeleteModal({ open: false, task: null });
      if (tasks.length === 1 && page > 1) setPage(page - 1);
      else load();
      fetchStats();
    }
  };

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-navy-950">
      <Sidebar activeFilter={filter} onFilterChange={(f) => setFilter(f)} stats={stats} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-navy-500 dark:text-navy-400">{greetingTime()},</p>
              <h1 className="text-2xl font-bold text-navy-900 dark:text-slate-100">{user?.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setTourStep(0); setTourOpen(true); }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-accent-400 dark:border-accent-600 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 text-sm font-medium transition-all"
              >
                <Compass size={15} /> Want a tour?
              </button>
              <button
                id="create-btn"
                onClick={() => { setEditingTask(null); setTaskModalOpen(true); }}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus size={16} /> Create
              </button>
            </div>
          </div>

         

          <div className="flex items-center gap-3 flex-wrap">
            <SearchBar value={search} onChange={setSearch} />
            <span className="text-sm font-semibold text-navy-600 dark:text-navy-300 hidden sm:block">
              {{ all: 'All Tasks', pending: 'Pending Tasks', completed: 'Completed Tasks' }[filter]}
            </span>
          </div>

          {isLoading ? (
            <TaskGridSkeleton />
          ) : tasks.length === 0 ? (
            <EmptyState isSearch={!!search} filter={filter} onCreateTask={() => { setEditingTask(null); setTaskModalOpen(true); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={(t) => { setEditingTask(t); setTaskModalOpen(true); }}
                  onDelete={(id) => { const t = tasks.find(t => t._id === id); if (t) setDeleteModal({ open: true, task: t }); }}
                />
              ))}
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <Pagination pagination={pagination} onPageChange={setPage} />
          )}
        </div>
      </main>

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => { setTaskModalOpen(false); setEditingTask(null); }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        editTask={editingTask}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, task: null })}
        onConfirm={handleDeleteConfirm}
        taskTitle={deleteModal.task?.title || ''}
      />

      <TourModal
        isOpen={tourOpen}
        steps={tourSteps}
        currentStep={tourStep}
        onNext={() => setTourStep(s => Math.min(s + 1, tourSteps.length - 1))}
        onPrev={() => setTourStep(s => Math.max(s - 1, 0))}
        onClose={() => setTourOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
