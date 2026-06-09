import { TourStep } from '../types';

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to TaskManager! 👋',
    description:
      'This quick tour walks you through everything you need to manage tasks. Exit anytime by clicking outside or pressing the Exit button.',
  },
  {
    id: 'create-task',
    title: 'Creating a New Task ✏️',
    description:
      'Click the "+ Create" button in the top-right to add a new task. Set a title, description, priority (low / medium / high), and an optional due date.',
    target: 'create-btn',
  },
  {
    id: 'task-card',
    title: 'Understanding Task Cards 📋',
    description:
      'Each card shows the title, description, priority badge, and due date. Use the pencil icon to edit, trash icon to delete, and the bottom button to toggle status.',
    target: 'task-card',
  },
  {
    id: 'mark-done',
    title: 'Marking Tasks as Done ✅',
    description:
      'Click "Mark as Done" on any pending task to complete it. It will appear in the Completed section. Toggle it back to pending anytime.',
  },
  {
    id: 'sidebar-filter',
    title: 'Filtering with the Sidebar 🗂️',
    description:
      'Use the sidebar to filter tasks. "Pending" shows unfinished tasks, "Completed" shows done ones, and "All Tasks" shows everything along with counts.',
    target: 'sidebar',
  },
  {
    id: 'search',
    title: 'Searching Tasks 🔍',
    description:
      'Use the search bar to instantly find tasks by title or description. Results update as you type with a short debounce.',
    target: 'search-bar',
  },
  {
    id: 'pagination',
    title: 'Navigating Pages 📄',
    description:
      'Tasks are shown 6 per page. Use the pagination controls at the bottom to move between pages. Current page and total count are always visible.',
    target: 'pagination',
  },
  {
    id: 'done',
    title: "You're all set! 🚀",
    description:
      'Those are all the main features. Start by creating your first task with the "+ Create" button. Good luck staying productive!',
  },
];
