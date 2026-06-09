import { useState, useCallback } from 'react';
import { Task, Pagination, TaskFilter, TaskFormData } from '../types';
import api from '../utils/api';
import toast from 'react-hot-toast';

interface UseTasksOptions {
  status?: TaskFilter;
  search?: string;
  page?: number;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  const fetchTasks = useCallback(
    async ({ status = 'all', search = '', page = 1 }: UseTasksOptions = {}) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: '6',
          status,
          search,
        });
        const res = await api.get(`/tasks?${params}`);
        setTasks(res.data.data.tasks);
        setPagination(res.data.data.pagination);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to fetch tasks');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/tasks/stats');
      setStats(res.data.data.stats);
    } catch {}
  }, []);

  const createTask = useCallback(async (data: TaskFormData): Promise<Task | null> => {
    try {
      const res = await api.post('/tasks', data);
      toast.success('Task created!');
      return res.data.data.task;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      return null;
    }
  }, []);

  const updateTask = useCallback(
    async (id: string, data: Partial<TaskFormData & { status: string }>): Promise<Task | null> => {
      try {
        const res = await api.put(`/tasks/${id}`, data);
        toast.success('Task updated!');
        return res.data.data.task;
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to update task');
        return null;
      }
    },
    []
  );

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete task');
      return false;
    }
  }, []);

  const toggleStatus = useCallback(async (id: string): Promise<Task | null> => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      return res.data.data.task;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status');
      return null;
    }
  }, []);

  return {
    tasks,
    pagination,
    isLoading,
    stats,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
  };
}
