import { format, isBefore, isToday } from 'date-fns';
import type { KanbanTask, Priority } from '../components/KanbanBoard/KanbanBoard.types';

export function generateTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createTask(
  data: Partial<KanbanTask> & { title: string; status: string }
): KanbanTask {
  return {
    id: generateTaskId(),
    title: data.title,
    description: data.description || '',
    status: data.status,
    priority: data.priority || 'medium',
    assignee: data.assignee || '',
    tags: data.tags || [],
    createdAt: new Date(),
    dueDate: data.dueDate || undefined,
  };
}

export function updateTask(
  task: KanbanTask,
  updates: Partial<KanbanTask>
): KanbanTask {
  return {
    ...task,
    ...updates,
  };
}

export function isOverdue(dueDate: Date | undefined): boolean {
  if (!dueDate) return false;
  const now = new Date();
  return isBefore(dueDate, now) && !isToday(dueDate);
}

export function formatDate(date: Date | undefined): string {
  if (!date) return '';
  if (isToday(date)) return 'Today';
  return format(date, 'MMM d, yyyy');
}

export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function getPriorityColor(priority: Priority | undefined): string {
  const colors = {
    low: 'bg-blue-100 text-blue-700 border-l-blue-500',
    medium: 'bg-yellow-100 text-yellow-700 border-l-yellow-500',
    high: 'bg-orange-100 text-orange-700 border-l-orange-500',
    urgent: 'bg-red-100 text-red-700 border-l-red-500',
  };
  return colors[priority || 'medium'];
}

export function getPriorityBorderColor(priority: Priority | undefined): string {
  const colors = {
    low: 'border-l-4 border-l-blue-500',
    medium: 'border-l-4 border-l-yellow-500',
    high: 'border-l-4 border-l-orange-500',
    urgent: 'border-l-4 border-l-red-500',
  };
  return colors[priority || 'medium'];
}

export function filterTasksByColumn(
  tasks: Record<string, KanbanTask>,
  columnId: string
): KanbanTask[] {
  return Object.values(tasks).filter((task) => task.status === columnId);
}

export function sortTasksByPriority(tasks: KanbanTask[]): KanbanTask[] {
  const priorityOrder: Record<Priority, number> = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...tasks].sort((a, b) => {
    const aPriority = priorityOrder[a.priority || 'medium'];
    const bPriority = priorityOrder[b.priority || 'medium'];
    return aPriority - bPriority;
  });
}

export function validateTask(task: Partial<KanbanTask>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!task.title || task.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (task.title && task.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }

  if (task.description && task.description.length > 2000) {
    errors.push('Description must be less than 2000 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
