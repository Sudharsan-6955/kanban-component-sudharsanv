import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { clsx } from 'clsx';
import { GripVertical, Calendar, AlertCircle } from 'lucide-react';
import type { KanbanTask } from './KanbanBoard.types';
import Avatar from './primitives/Avatar';
import { formatDate, isOverdue, getPriorityBorderColor } from '../../utils/task.utils';

export interface KanbanCardProps {
  task: KanbanTask;
  onClick: (task: KanbanTask) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = memo(({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const taskIsOverdue = isOverdue(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200',
        'cursor-pointer group',
        isDragging && 'opacity-50 shadow-lg ring-2 ring-primary-500',
        getPriorityBorderColor(task.priority)
      )}
      onClick={() => onClick(task)}
    >
      <div className="p-3 sm:p-4">
        {/* Header with drag handle */}
        <div className="flex items-start gap-1.5 sm:gap-2 mb-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-0.5 sm:p-1 -ml-0.5 sm:-ml-1 text-neutral-400 hover:text-neutral-600 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded touch-manipulation"
            aria-label="Drag to move task"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-neutral-900 text-sm sm:text-base leading-tight break-words">
              {task.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-neutral-100">
          {/* Due date */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {task.dueDate && (
              <div
                className={clsx(
                  'flex items-center gap-0.5 sm:gap-1 text-xs truncate',
                  taskIsOverdue ? 'text-red-600 font-medium' : 'text-neutral-500'
                )}
              >
                {taskIsOverdue && <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />}
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                <span className="truncate">{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Assignee */}
          {task.assignee && (
            <Avatar name={task.assignee} size="sm" className="flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
});

KanbanCard.displayName = 'KanbanCard';

export default KanbanCard;
