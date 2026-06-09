import { Response, NextFunction } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../middleware/authenticate';

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '6',
      status = 'all',
      search = '',
      priority = 'all',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: Record<string, any> = { user: req.userId };

    if (status !== 'all') {
      filter.status = status;
    }

    if (priority !== 'all') {
      filter.priority = priority;
    }

    if (search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Sort
    const sortDirection = sortOrder === 'asc' ? 1 : -1;
    const sortObj: Record<string, 1 | -1> = {
      [sortBy]: sortDirection,
    };

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Task.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        tasks,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    res.json({ success: true, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description: description || '',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      user: req.userId,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleTaskStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();

    res.json({
      success: true,
      message: `Task marked as ${task.status}`,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [total, pending, completed] = await Promise.all([
      Task.countDocuments({ user: req.userId }),
      Task.countDocuments({ user: req.userId, status: 'pending' }),
      Task.countDocuments({ user: req.userId, status: 'completed' }),
    ]);

    res.json({
      success: true,
      data: { stats: { total, pending, completed } },
    });
  } catch (error) {
    next(error);
  }
};
