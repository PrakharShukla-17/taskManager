import { z } from 'zod';

// Auth validators
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Please provide a valid email')
      .toLowerCase()
      .trim(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password cannot exceed 100 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Please provide a valid email')
      .toLowerCase()
      .trim(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// Task validators
export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, 'Title is required')
      .max(100, 'Title cannot exceed 100 characters')
      .trim(),
    description: z
      .string()
      .max(1000, 'Description cannot exceed 1000 characters')
      .trim()
      .optional()
      .default(''),
    priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
    dueDate: z.string().datetime().optional().nullable(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID'),
  }),
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title cannot exceed 100 characters')
      .trim()
      .optional(),
    description: z
      .string()
      .max(1000, 'Description cannot exceed 1000 characters')
      .trim()
      .optional(),
    status: z.enum(['pending', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().datetime().optional().nullable(),
  }),
});

export const taskIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID'),
  }),
});

export const getTasksQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('6'),
    status: z.enum(['pending', 'completed', 'all']).optional().default('all'),
    search: z.string().optional().default(''),
    priority: z.enum(['low', 'medium', 'high', 'all']).optional().default('all'),
    sortBy: z.string().optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type CreateTaskInput = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>['body'];
