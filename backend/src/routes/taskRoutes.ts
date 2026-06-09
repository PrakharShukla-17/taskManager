import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  getTaskStats,
} from '../controllers/taskController';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  getTasksQuerySchema,
} from '../validators/schemas';

const router = Router();

// All task routes require authentication
router.use(authenticate);

router.get('/stats', getTaskStats);
router.get('/', validate(getTasksQuerySchema), getTasks);
router.post('/', validate(createTaskSchema), createTask);
router.get('/:id', validate(taskIdSchema), getTask);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', validate(taskIdSchema), deleteTask);
router.patch('/:id/toggle', validate(taskIdSchema), toggleTaskStatus);

export default router;
