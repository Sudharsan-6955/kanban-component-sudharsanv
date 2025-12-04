import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { clsx } from 'clsx';
import { Plus, AlertTriangle } from 'lucide-react';
import type { KanbanColumn, KanbanTask } from './KanbanBoard.types';
import KanbanCard from './KanbanCard';
import Button from './primitives/Button.tsx';
import { getColumnTaskCount, getWipLimitStatus } from '../../utils/column.utils';

export interface KanbanColumnProps {
  column: KanbanColumn;
  tasks: KanbanTask[];
  onTaskClick: (task: KanbanTask) => void;
  onAddTask: (columnId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onTaskClick,
  onAddTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  const taskCount = getColumnTaskCount(column);
  const wipStatus = getWipLimitStatus(column);
  const showWipWarning = wipStatus.status !== 'safe';

  return (
    <div className="flex flex-col h-full w-full sm:min-w-[280px] md:min-w-[320px] lg:min-w-[340px]">
      {/* Column Header */}
      <div className="flex-shrink-0 mb-3 sm:mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: column.color }}
              aria-hidden="true"
            />
            <h2 className="font-semibold text-neutral-900 text-lg">
              {column.title}
            </h2>
            <span className="text-sm text-neutral-500 font-medium">
              {taskCount}
              {column.maxTasks && ` / ${column.maxTasks}`}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => onAddTask(column.id)}
            aria-label={`Add task to ${column.title}`}
          >
            Add
          </Button>
        </div>

        {/* WIP Limit Warning */}
        {showWipWarning && column.maxTasks && (
          <div
            className={clsx(
              'flex items-center gap-1.5 text-xs px-2 py-1 rounded-md',
              wipStatus.status === 'limit'
                ? 'bg-red-50 text-red-700'
                : 'bg-yellow-50 text-yellow-700'
            )}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {wipStatus.status === 'limit'
                ? 'WIP limit reached'
                : `${Math.round(wipStatus.percentage)}% of WIP limit`}
            </span>
          </div>
        )}
      </div>

      {/* Task List with Drop Zone */}
      <div
        ref={setNodeRef}
        className={clsx(
          'flex-1 rounded-lg p-2 sm:p-3 transition-colors duration-200 min-h-[150px] sm:min-h-[200px]',
          isOver && 'bg-primary-50 ring-2 ring-primary-300',
          !isOver && 'bg-neutral-50'
        )}
      >
        <SortableContext
          items={column.taskIds}
          strategy={verticalListSortingStrategy}
          id={column.id}
        >
          <div className="space-y-2 sm:space-y-2.5">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-2 sm:mb-3">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-500">No tasks yet</p>
                <p className="text-xs text-neutral-400 mt-1 hidden sm:block">
                  Click "Add" to create a task
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <KanbanCard key={task.id} task={task} onClick={onTaskClick} />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
