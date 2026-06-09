export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  user: string;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: Pagination;
}

export type TaskFilter = 'all' | 'pending' | 'completed';
export type TaskPriority = 'all' | 'low' | 'medium' | 'high';

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
}
