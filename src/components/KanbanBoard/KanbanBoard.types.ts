export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string; // column identifier
  priority?: Priority;
  assignee?: string;
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  taskIds: string[]; // ordered list of task IDs
  maxTasks?: number; // WIP limit (optional)
}

export interface BoardState {
  columns: Record<string, KanbanColumn>;
  tasks: Record<string, KanbanTask>;
  columnOrder: string[];
}

export interface KanbanViewProps {
  columns: KanbanColumn[];
  tasks: Record<string, KanbanTask>;
  onTaskMove: (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;
  onTaskCreate: (columnId: string, task: Omit<KanbanTask, 'id' | 'createdAt'>) => void;
  onTaskUpdate: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete: (taskId: string) => void;
}

export interface DragItem {
  id: string;
  type: 'task' | 'column';
  columnId: string;
  index: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  tags: string[];
  dueDate: Date | null;
}
