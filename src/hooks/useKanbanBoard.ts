import { useState, useEffect, useCallback } from 'react';
import type { BoardState, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';
import { createTask } from '../utils/task.utils';
import { reorderTasks, moveTaskBetweenColumns } from '../utils/column.utils';

const STORAGE_KEY = 'kanban-board-state';

export function useKanbanBoard(initialState?: BoardState) {
  const [boardState, setBoardState] = useState<BoardState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.values(parsed.tasks).forEach((task: any) => {
            if (task.createdAt) task.createdAt = new Date(task.createdAt);
            if (task.dueDate) task.dueDate = new Date(task.dueDate);
          });
          return parsed;
        } catch (error) {
          console.error('Failed to parse saved board state:', error);
        }
      }
    }
    return initialState || getDefaultBoardState();
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(boardState));
    }
  }, [boardState]);

  const handleTaskCreate = useCallback(
    (columnId: string, taskData: Omit<KanbanTask, 'id' | 'createdAt'>) => {
      const newTask = createTask({ ...taskData, status: columnId });
      
      setBoardState((prev) => {
        const column = prev.columns[columnId];
        if (!column) return prev;

        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [newTask.id]: newTask,
          },
          columns: {
            ...prev.columns,
            [columnId]: {
              ...column,
              taskIds: [...column.taskIds, newTask.id],
            },
          },
        };
      });

      return newTask.id;
    },
    []
  );

  const handleTaskUpdate = useCallback(
    (taskId: string, updates: Partial<KanbanTask>) => {
      setBoardState((prev) => {
        const task = prev.tasks[taskId];
        if (!task) return prev;

        if (updates.status && updates.status !== task.status) {
          const oldColumnId = task.status;
          const newColumnId = updates.status;
          const oldColumn = prev.columns[oldColumnId];
          const newColumn = prev.columns[newColumnId];

          if (!oldColumn || !newColumn) return prev;

          const updatedOldTaskIds = oldColumn.taskIds.filter((id) => id !== taskId);
          const updatedNewTaskIds = [...newColumn.taskIds, taskId];

          return {
            ...prev,
            tasks: {
              ...prev.tasks,
              [taskId]: { ...task, ...updates },
            },
            columns: {
              ...prev.columns,
              [oldColumnId]: {
                ...oldColumn,
                taskIds: updatedOldTaskIds,
              },
              [newColumnId]: {
                ...newColumn,
                taskIds: updatedNewTaskIds,
              },
            },
          };
        }

        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: { ...task, ...updates },
          },
        };
      });
    },
    []
  );

  const handleTaskDelete = useCallback((taskId: string) => {
    setBoardState((prev) => {
      const task = prev.tasks[taskId];
      if (!task) return prev;

      const column = prev.columns[task.status];
      if (!column) return prev;

      const { [taskId]: deletedTask, ...remainingTasks } = prev.tasks;

      return {
        ...prev,
        tasks: remainingTasks,
        columns: {
          ...prev.columns,
          [task.status]: {
            ...column,
            taskIds: column.taskIds.filter((id) => id !== taskId),
          },
        },
      };
    });
  }, []);

  const handleTaskMove = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, newIndex: number) => {
      setBoardState((prev) => {
        const task = prev.tasks[taskId];
        const sourceColumn = prev.columns[fromColumnId];
        const destColumn = prev.columns[toColumnId];

        if (!task || !sourceColumn || !destColumn) return prev;

        const sourceIndex = sourceColumn.taskIds.indexOf(taskId);
        if (sourceIndex === -1) return prev;

        if (fromColumnId === toColumnId) {
          const reorderedTaskIds = reorderTasks(sourceColumn.taskIds, sourceIndex, newIndex);

          return {
            ...prev,
            columns: {
              ...prev.columns,
              [fromColumnId]: {
                ...sourceColumn,
                taskIds: reorderedTaskIds,
              },
            },
          };
        }

        const { sourceColumn: updatedSource, destColumn: updatedDest } =
          moveTaskBetweenColumns(sourceColumn, destColumn, sourceIndex, newIndex);

        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: { ...task, status: toColumnId },
          },
          columns: {
            ...prev.columns,
            [fromColumnId]: updatedSource,
            [toColumnId]: updatedDest,
          },
        };
      });
    },
    []
  );

  const resetBoard = useCallback(() => {
    setBoardState(getDefaultBoardState());
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const loadBoardState = useCallback((state: BoardState) => {
    setBoardState(state);
  }, []);

  return {
    boardState,
    columns: Object.values(boardState.columns).sort(
      (a, b) =>
        boardState.columnOrder.indexOf(a.id) - boardState.columnOrder.indexOf(b.id)
    ),
    tasks: boardState.tasks,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskMove,
    resetBoard,
    loadBoardState,
  };
}

function getDefaultBoardState(): BoardState {
  return {
    columns: {
      'todo': {
        id: 'todo',
        title: 'To Do',
        color: '#0ea5e9',
        taskIds: [],
        maxTasks: undefined,
      },
      'in-progress': {
        id: 'in-progress',
        title: 'In Progress',
        color: '#f59e0b',
        taskIds: [],
        maxTasks: 3,
      },
      'review': {
        id: 'review',
        title: 'Review',
        color: '#8b5cf6',
        taskIds: [],
        maxTasks: undefined,
      },
      'done': {
        id: 'done',
        title: 'Done',
        color: '#10b981',
        taskIds: [],
        maxTasks: undefined,
      },
    },
    tasks: {},
    columnOrder: ['todo', 'in-progress', 'review', 'done'],
  };
}

export { getDefaultBoardState };
