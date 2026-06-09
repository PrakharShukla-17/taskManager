import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Task, TaskFormData } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  editTask?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, editTask }) => {
  const [form, setForm] = useState<TaskFormData>({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        priority: editTask.priority,
        dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
      });
    } else {
      setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    }
    setErrors({});
  }, [editTask, isOpen]);

  const validate = () => {
    const e: { title?: string } = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (form.title.length > 100) e.title = 'Title is too long';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({ ...form, dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="card w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-navy-100 dark:border-navy-800">
          <h2 className="font-bold text-lg text-navy-900 dark:text-slate-100">
            {editTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-800 text-navy-500 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              maxLength={100}
              className={`input-field ${errors.title ? 'border-red-400 focus:ring-red-400' : ''}`}
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Description</label>
            <textarea
              className="input-field resize-none"
              placeholder="Add more details..."
              rows={3}
              maxLength={1000}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Priority</label>
              <select
                className="input-field"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as TaskFormData['priority'] })}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-1.5">Due Date</label>
              <input
                type="date"
                className="input-field"
                value={form.dueDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {editTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
