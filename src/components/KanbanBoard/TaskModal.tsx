import React, { useState, useEffect } from 'react';
import Modal from './primitives/Modal';
import Button from './primitives/Button.tsx';
import { Trash2, X } from 'lucide-react';
import type { KanbanTask, Priority, TaskFormData } from './KanbanBoard.types';
import { validateTask } from '../../utils/task.utils';

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<KanbanTask>) => void;
  onDelete?: () => void;
  task?: KanbanTask | null;
  initialStatus?: string;
}

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  initialStatus,
}) => {
  const isEditing = Boolean(task);

  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    tags: [],
    dueDate: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority || 'medium',
        assignee: task.assignee || '',
        tags: task.tags || [],
        dueDate: task.dueDate || null,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        tags: [],
        dueDate: null,
      });
    }
    setErrors([]);
    setTagInput('');
  }, [task, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateTask({
      title: formData.title,
      description: formData.description,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSaving(true);

    try {
      const taskData: Partial<KanbanTask> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        assignee: formData.assignee.trim(),
        tags: formData.tags,
        dueDate: formData.dueDate || undefined,
      };

      if (!isEditing && initialStatus) {
        taskData.status = initialStatus;
      }

      onSave(taskData);
      onClose();
    } catch (error) {
      setErrors(['Failed to save task. Please try again.']);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-neutral-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter task title"
            required
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            id="task-description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Add a description..."
            rows={4}
          />
        </div>

        {/* Priority and Assignee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Priority */}
          <div>
            <label htmlFor="task-priority" className="block text-sm font-medium text-neutral-700 mb-1">
              Priority
            </label>
            <select
              id="task-priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, priority: e.target.value as Priority }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label htmlFor="task-assignee" className="block text-sm font-medium text-neutral-700 mb-1">
              Assignee
            </label>
            <input
              id="task-assignee"
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter assignee name"
            />
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="task-due-date" className="block text-sm font-medium text-neutral-700 mb-1">
            Due Date
          </label>
          <input
            id="task-due-date"
            type="date"
            value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dueDate: e.target.value ? new Date(e.target.value) : null,
              }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="task-tags" className="block text-sm font-medium text-neutral-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="task-tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Add a tag and press Enter"
            />
            <Button type="button" variant="secondary" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary-900"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
          <div>
            {isEditing && onDelete && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={isSaving}>
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
