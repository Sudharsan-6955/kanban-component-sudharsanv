import type { Meta, StoryObj } from '@storybook/react';
import KanbanBoard from './KanbanBoard';
import '../../../src/index.css';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A fully functional Kanban board with drag-and-drop functionality, task management, and WIP limits.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

const createSampleTask = (id: string, overrides: any = {}) => ({
  id,
  title: 'Sample Task',
  description: 'This is a sample task description',
  status: 'todo',
  priority: 'medium' as const,
  assignee: 'John Doe',
  tags: ['feature'],
  createdAt: new Date(),
  dueDate: undefined,
  ...overrides,
});

export const Default: Story = {
  args: {
    initialState: {
      columns: {
        'todo': {
          id: 'todo',
          title: 'To Do',
          color: '#0ea5e9',
          taskIds: ['task-1', 'task-2', 'task-3'],
        },
        'in-progress': {
          id: 'in-progress',
          title: 'In Progress',
          color: '#f59e0b',
          taskIds: ['task-4', 'task-5'],
          maxTasks: 3,
        },
        'review': {
          id: 'review',
          title: 'Review',
          color: '#8b5cf6',
          taskIds: ['task-6'],
        },
        'done': {
          id: 'done',
          title: 'Done',
          color: '#10b981',
          taskIds: ['task-7', 'task-8'],
        },
      },
      tasks: {
        'task-1': createSampleTask('task-1', {
          title: 'Design new landing page',
          description: 'Create mockups and prototypes for the new landing page design',
          status: 'todo',
          priority: 'high',
          assignee: 'Sarah Johnson',
          tags: ['design', 'frontend'],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }),
        'task-2': createSampleTask('task-2', {
          title: 'Implement user authentication',
          description: 'Add JWT-based authentication with OAuth providers',
          status: 'todo',
          priority: 'urgent',
          assignee: 'Mike Chen',
          tags: ['backend', 'security'],
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        }),
        'task-3': createSampleTask('task-3', {
          title: 'Update documentation',
          description: 'Update API documentation with new endpoints',
          status: 'todo',
          priority: 'low',
          assignee: 'Emily Davis',
          tags: ['documentation'],
        }),
        'task-4': createSampleTask('task-4', {
          title: 'Fix responsive layout issues',
          description: 'Mobile view is breaking on small screens',
          status: 'in-progress',
          priority: 'high',
          assignee: 'Alex Kim',
          tags: ['bug', 'frontend'],
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        }),
        'task-5': createSampleTask('task-5', {
          title: 'Optimize database queries',
          description: 'Improve query performance for dashboard',
          status: 'in-progress',
          priority: 'medium',
          assignee: 'David Lee',
          tags: ['backend', 'performance'],
        }),
        'task-6': createSampleTask('task-6', {
          title: 'Review pull request #234',
          description: 'New feature for export functionality',
          status: 'review',
          priority: 'medium',
          assignee: 'Sarah Johnson',
          tags: ['review'],
        }),
        'task-7': createSampleTask('task-7', {
          title: 'Setup CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          status: 'done',
          priority: 'high',
          assignee: 'Mike Chen',
          tags: ['devops', 'infrastructure'],
        }),
        'task-8': createSampleTask('task-8', {
          title: 'Create project roadmap',
          description: 'Plan Q1 2025 feature releases',
          status: 'done',
          priority: 'medium',
          assignee: 'Emily Davis',
          tags: ['planning'],
        }),
      },
      columnOrder: ['todo', 'in-progress', 'review', 'done'],
    },
  },
};

export const EmptyState: Story = {
  args: {
    initialState: {
      columns: {
        'todo': {
          id: 'todo',
          title: 'To Do',
          color: '#0ea5e9',
          taskIds: [],
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
        },
        'done': {
          id: 'done',
          title: 'Done',
          color: '#10b981',
          taskIds: [],
        },
      },
      tasks: {},
      columnOrder: ['todo', 'in-progress', 'review', 'done'],
    },
  },
};

export const WithManyTasks: Story = {
  args: {
    initialState: (() => {
      const taskIds = Array.from({ length: 25 }, (_, i) => `task-${i + 1}`);
      const tasks: any = {};
      
      taskIds.forEach((id, index) => {
        const status = ['todo', 'in-progress', 'review', 'done'][index % 4];
        tasks[id] = createSampleTask(id, {
          title: `Task ${index + 1}: ${['Implement feature', 'Fix bug', 'Write tests', 'Update docs'][index % 4]}`,
          description: `Detailed description for task ${index + 1}`,
          status,
          priority: ['low', 'medium', 'high', 'urgent'][index % 4],
          assignee: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'][index % 5],
          tags: [['frontend'], ['backend'], ['testing'], ['documentation']][index % 4],
        });
      });

      return {
        columns: {
          'todo': {
            id: 'todo',
            title: 'To Do',
            color: '#0ea5e9',
            taskIds: taskIds.filter((_, i) => i % 4 === 0),
          },
          'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            color: '#f59e0b',
            taskIds: taskIds.filter((_, i) => i % 4 === 1),
            maxTasks: 3,
          },
          'review': {
            id: 'review',
            title: 'Review',
            color: '#8b5cf6',
            taskIds: taskIds.filter((_, i) => i % 4 === 2),
          },
          'done': {
            id: 'done',
            title: 'Done',
            color: '#10b981',
            taskIds: taskIds.filter((_, i) => i % 4 === 3),
          },
        },
        tasks,
        columnOrder: ['todo', 'in-progress', 'review', 'done'],
      };
    })(),
  },
};

export const DifferentPriorities: Story = {
  args: {
    initialState: {
      columns: {
        'todo': {
          id: 'todo',
          title: 'Priority Showcase',
          color: '#0ea5e9',
          taskIds: ['urgent-task', 'high-task', 'medium-task', 'low-task'],
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
        },
        'done': {
          id: 'done',
          title: 'Done',
          color: '#10b981',
          taskIds: [],
        },
      },
      tasks: {
        'urgent-task': createSampleTask('urgent-task', {
          title: 'URGENT: Production server down',
          description: 'Critical issue affecting all users',
          status: 'todo',
          priority: 'urgent',
          assignee: 'DevOps Team',
          tags: ['urgent', 'production', 'bug'],
          dueDate: new Date(), // Today (overdue if past time)
        }),
        'high-task': createSampleTask('high-task', {
          title: 'HIGH: Security vulnerability patch',
          description: 'Apply security patch to prevent exploits',
          status: 'todo',
          priority: 'high',
          assignee: 'Security Team',
          tags: ['security', 'high-priority'],
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        }),
        'medium-task': createSampleTask('medium-task', {
          title: 'MEDIUM: Add new feature',
          description: 'Implement requested feature for next release',
          status: 'todo',
          priority: 'medium',
          assignee: 'Dev Team',
          tags: ['feature', 'enhancement'],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }),
        'low-task': createSampleTask('low-task', {
          title: 'LOW: Code cleanup',
          description: 'Remove deprecated functions and unused imports',
          status: 'todo',
          priority: 'low',
          assignee: 'Any Developer',
          tags: ['maintenance', 'cleanup'],
        }),
      },
      columnOrder: ['todo', 'in-progress', 'review', 'done'],
    },
  },
};

export const InteractiveDemo: Story = {
  args: Default.args,
  parameters: {
    docs: {
      description: {
        story: 'Try dragging tasks between columns, clicking to edit, and adding new tasks!',
      },
    },
  },
};

export const MobileView: Story = {
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'View the Kanban board on mobile devices with horizontal scrolling',
      },
    },
  },
};

export const Accessibility: Story = {
  args: Default.args,
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation: Use Tab to focus, Enter to select, Arrow keys to move tasks, Escape to cancel',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
};
