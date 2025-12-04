import React, { useState, useMemo } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { BoardState, KanbanTask } from './KanbanBoard.types';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { useDragAndDrop, useDragHandlers } from '../../hooks/useDragAndDrop';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import TaskModal from './TaskModal';

export interface KanbanBoardProps {
  initialState?: BoardState;
  className?: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialState, className }) => {
  const {
    columns,
    tasks,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskMove,
  } = useKanbanBoard(initialState);

  const { sensors, collisionDetection } = useDragAndDrop();
  const { handleDragStart, handleDragOver, handleDragEnd, handleDragCancel } =
    useDragHandlers(handleTaskMove);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<KanbanTask | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleTaskClick = (task: KanbanTask) => {
    setEditingTask(task);
    setActiveColumnId(null);
    setIsModalOpen(true);
  };

  const handleAddTask = (columnId: string) => {
    setEditingTask(null);
    setActiveColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleModalSave = (taskData: Partial<KanbanTask>) => {
    if (editingTask) {
      handleTaskUpdate(editingTask.id, taskData);
    } else if (activeColumnId) {
      handleTaskCreate(activeColumnId, {
        title: taskData.title!,
        status: activeColumnId,
        description: taskData.description,
        priority: taskData.priority,
        assignee: taskData.assignee,
        tags: taskData.tags,
        dueDate: taskData.dueDate,
      });
    }
  };

  const handleModalDelete = () => {
    if (editingTask) {
      handleTaskDelete(editingTask.id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setActiveColumnId(null);
  };

  const activeTask = useMemo(() => {
    if (!activeTaskId) return null;
    return tasks[activeTaskId] || null;
  }, [activeTaskId, tasks]);

  const handleDragStartWithState = (event: any) => {
    setActiveTaskId(event.active.id as string);
    handleDragStart(event);
  };

  const handleDragEndWithState = (event: any) => {
    setActiveTaskId(null);
    handleDragEnd(event);
  };

  const handleDragCancelWithState = () => {
    setActiveTaskId(null);
    handleDragCancel();
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStartWithState}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEndWithState}
        onDragCancel={handleDragCancelWithState}
      >
        <div className={className}>
          {/* Board Container */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-4 px-2 sm:px-3">
            {columns.map((column) => {
              const columnTasks = column.taskIds
                .map((taskId) => tasks[taskId])
                .filter(Boolean);

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  onTaskClick={handleTaskClick}
                  onAddTask={handleAddTask}
                />
              );
            })}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-80">
              <KanbanCard task={activeTask} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onDelete={editingTask ? handleModalDelete : undefined}
        task={editingTask}
        initialStatus={activeColumnId || undefined}
      />
    </>
  );
};

export default KanbanBoard;
