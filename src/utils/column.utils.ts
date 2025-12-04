import type { KanbanColumn } from '../components/KanbanBoard/KanbanBoard.types';

export function generateColumnId(): string {
  return `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function reorderTasks(
  taskIds: string[],
  startIndex: number,
  endIndex: number
): string[] {
  const result = Array.from(taskIds);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function moveTaskBetweenColumns(
  sourceColumn: KanbanColumn,
  destColumn: KanbanColumn,
  sourceIndex: number,
  destIndex: number
): {
  sourceColumn: KanbanColumn;
  destColumn: KanbanColumn;
} {
  const sourceTaskIds = Array.from(sourceColumn.taskIds);
  const destTaskIds = Array.from(destColumn.taskIds);
  const [movedTaskId] = sourceTaskIds.splice(sourceIndex, 1);
  destTaskIds.splice(destIndex, 0, movedTaskId);

  return {
    sourceColumn: {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    },
    destColumn: {
      ...destColumn,
      taskIds: destTaskIds,
    },
  };
}

export function getColumnTaskCount(column: KanbanColumn): number {
  return column.taskIds.length;
}

export function isAtWipLimit(column: KanbanColumn): boolean {
  if (!column.maxTasks) return false;
  return column.taskIds.length >= column.maxTasks;
}

export function wouldExceedWipLimit(column: KanbanColumn, additionalTasks = 1): boolean {
  if (!column.maxTasks) return false;
  return column.taskIds.length + additionalTasks > column.maxTasks;
}

export function getWipLimitStatus(column: KanbanColumn): {
  percentage: number;
  status: 'safe' | 'warning' | 'limit';
} {
  if (!column.maxTasks) {
    return { percentage: 0, status: 'safe' };
  }

  const percentage = (column.taskIds.length / column.maxTasks) * 100;

  if (percentage >= 100) {
    return { percentage, status: 'limit' };
  } else if (percentage >= 80) {
    return { percentage, status: 'warning' };
  }

  return { percentage, status: 'safe' };
}

export function validateColumn(column: Partial<KanbanColumn>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!column.id || column.id.trim().length === 0) {
    errors.push('Column ID is required');
  }

  if (!column.title || column.title.trim().length === 0) {
    errors.push('Column title is required');
  }

  if (column.title && column.title.length > 50) {
    errors.push('Column title must be less than 50 characters');
  }

  if (!column.color || column.color.trim().length === 0) {
    errors.push('Column color is required');
  }

  if (column.maxTasks !== undefined && column.maxTasks < 1) {
    errors.push('Max tasks must be at least 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function getColumnById(
  columns: Record<string, KanbanColumn>,
  columnId: string
): KanbanColumn | undefined {
  return columns[columnId];
}

export function updateColumn(
  columns: Record<string, KanbanColumn>,
  columnId: string,
  updates: Partial<KanbanColumn>
): Record<string, KanbanColumn> {
  return {
    ...columns,
    [columnId]: {
      ...columns[columnId],
      ...updates,
    },
  };
}
