import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export function useDragAndDrop() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, 
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return {
    sensors,
    collisionDetection: closestCorners,
  };
}


export function useDragHandlers(
  onTaskMove: (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => void
) {
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log('Drag started:', active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    else return active
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumnId = active.data.current?.sortable?.containerId as string;
    const overColumnId = over.data.current?.sortable?.containerId as string || overId;

    if (activeId === overId && activeColumnId === overColumnId) {
      return;
    }

    const overIndex = over.data.current?.sortable?.index ?? 0;

    onTaskMove(activeId, activeColumnId, overColumnId, overIndex);
  };

  const handleDragCancel = () => {
    console.log('Drag cancelled');
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
