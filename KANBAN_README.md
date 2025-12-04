# Kanban Board Component

A fully functional, production-ready Kanban board built with React, TypeScript, Tailwind CSS, and @dnd-kit for drag-and-drop functionality.

## ✨ Features

### Core Functionality
- ✅ **Drag & Drop**: Smooth drag-and-drop with @dnd-kit (mouse, touch, and keyboard support)
- ✅ **Task Management**: Create, edit, and delete tasks with full CRUD operations
- ✅ **Column-based Organization**: Move tasks between columns (To Do, In Progress, Review, Done)
- ✅ **WIP Limits**: Work-in-progress limits for columns with visual warnings
- ✅ **Persistent State**: Automatic saving to localStorage

### Task Features
- **Priority Levels**: Low, Medium, High, Urgent with color coding
- **Assignees**: Assign tasks with avatar display
- **Tags**: Multiple tags per task with easy management
- **Due Dates**: Optional due dates with overdue indicators
- **Rich Descriptions**: Full task descriptions and metadata

### User Experience
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Keyboard Navigation**: Full keyboard accessibility support
- **Visual Feedback**: Hover states, drag overlays, and animations
- **Modal Dialogs**: Clean task editing interface with focus management
- **Empty States**: Helpful empty state messages

### Developer Experience
- **TypeScript**: Full type safety throughout
- **Storybook**: 7+ comprehensive stories for all use cases
- **Custom Hooks**: Reusable `useKanbanBoard` and `useDragAndDrop` hooks
- **Utility Functions**: Helper functions for common operations
- **Component Library**: Reusable Button, Modal, and Avatar primitives

## 🚀 Quick Start

### Running the Application

\`\`\`bash
# Start the development server
npm run dev
\`\`\`

Visit http://localhost:5173 to see the Kanban board in action.

### Running Storybook

\`\`\`bash
# Start Storybook
npm run storybook
\`\`\`

Visit http://localhost:6006 to explore component stories.

### Building for Production

\`\`\`bash
# Build the application
npm run build

# Preview production build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/
│   └── KanbanBoard/
│       ├── KanbanBoard.tsx          # Main board component
│       ├── KanbanBoard.types.ts     # TypeScript type definitions
│       ├── KanbanBoard.stories.tsx  # Storybook stories
│       ├── KanbanCard.tsx           # Individual task card
│       ├── KanbanColumn.tsx         # Column container
│       ├── TaskModal.tsx            # Task edit/create modal
│       └── primitives/
│           ├── Button.tsx           # Reusable button component
│           ├── Modal.tsx            # Reusable modal component
│           └── Avatar.tsx           # User avatar component
├── hooks/
│   ├── useKanbanBoard.ts           # Board state management hook
│   └── useDragAndDrop.ts           # Drag-and-drop logic hook
├── utils/
│   ├── task.utils.ts               # Task utility functions
│   └── column.utils.ts             # Column utility functions
└── styles/
    └── globals.css                 # Global styles
\`\`\`

## 🎨 Design Tokens

Custom Tailwind configuration with brand colors:

\`\`\`javascript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',
    700: '#0369a1',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    700: '#3f3f46',
    900: '#18181b',
  },
}
\`\`\`

## 📖 Usage Examples

### Basic Usage

\`\`\`tsx
import KanbanBoard from './components/KanbanBoard/KanbanBoard';

function App() {
  return <KanbanBoard />;
}
\`\`\`

### With Custom Initial State

\`\`\`tsx
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import type { BoardState } from './components/KanbanBoard/KanbanBoard.types';

const customState: BoardState = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      color: '#0ea5e9',
      taskIds: ['task-1'],
    },
    // ... more columns
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'My First Task',
      description: 'Task description',
      status: 'todo',
      priority: 'high',
      assignee: 'John Doe',
      tags: ['feature'],
      createdAt: new Date(),
    },
  },
  columnOrder: ['todo', 'in-progress', 'review', 'done'],
};

function App() {
  return <KanbanBoard initialState={customState} />;
}
\`\`\`

### Using Custom Hooks

\`\`\`tsx
import { useKanbanBoard } from './hooks/useKanbanBoard';

function MyComponent() {
  const {
    columns,
    tasks,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
    handleTaskMove,
  } = useKanbanBoard();

  // Use the hook methods for custom implementations
  const createTask = () => {
    handleTaskCreate('todo', {
      title: 'New Task',
      status: 'todo',
      priority: 'medium',
    });
  };

  return (
    <div>
      <button onClick={createTask}>Add Task</button>
      {/* Custom board UI */}
    </div>
  );
}
\`\`\`

## 🎯 Storybook Stories

The following stories are available in Storybook:

1. **Default** - Basic board with sample tasks across all columns
2. **Empty State** - Clean board with no tasks
3. **With Many Tasks** - Performance test with 25+ tasks
4. **Different Priorities** - Showcase all priority levels
5. **Interactive Demo** - Full drag-and-drop functionality
6. **Mobile View** - Responsive mobile layout
7. **Accessibility** - Keyboard navigation demonstration

## ⌨️ Keyboard Shortcuts

- **Tab** - Navigate between focusable elements
- **Enter** - Open task for editing
- **Arrow Keys** - Move tasks when dragging (with keyboard sensor)
- **Escape** - Close modal or cancel drag operation
- **Space** - Activate drag (when focused on drag handle)

## ♿ Accessibility Features

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management in modals
- Color contrast compliance
- Semantic HTML structure
- Screen reader announcements for drag operations

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Full type safety
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **@dnd-kit** - Modern drag-and-drop library
- **date-fns** - Date formatting and manipulation
- **lucide-react** - Beautiful icon library
- **Storybook 8** - Component documentation

## 📦 Dependencies

### Production
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `@dnd-kit/core` ^6.3.1
- `@dnd-kit/sortable` ^9.0.0
- `@dnd-kit/utilities` ^3.2.2
- `clsx` ^2.1.1
- `date-fns` ^4.1.0
- `lucide-react` ^0.469.0

### Development
- `typescript` ~5.9.3
- `vite` ^7.2.4
- `tailwindcss` ^3.4.18
- `@storybook/react-vite` ^8.5.0
- ESLint, PostCSS, Autoprefixer

## 🧪 Testing

The project includes comprehensive Storybook stories for manual testing. Each component has been tested for:

- ✅ Visual appearance
- ✅ Interaction behavior
- ✅ Responsive design
- ✅ Accessibility compliance
- ✅ Edge cases (empty states, many items, etc.)

## 🚀 Performance Optimizations

- **React.memo** on KanbanCard to prevent unnecessary re-renders
- **Optimized drag handlers** with proper event delegation
- **Efficient state updates** with immutable patterns
- **Minimal re-renders** with proper dependency arrays
- **localStorage persistence** with debouncing (automatic)

## 📝 Type Definitions

All components are fully typed. Key types include:

\`\`\`typescript
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: Priority;
  assignee?: string;
  tags?: string[];
  createdAt: Date;
  dueDate?: Date;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
  maxTasks?: number;
}

interface BoardState {
  columns: Record<string, KanbanColumn>;
  tasks: Record<string, KanbanTask>;
  columnOrder: string[];
}
\`\`\`

## 🎨 Customization

### Changing Column Colors

Edit the `initialState` or modify the default columns in `useKanbanBoard.ts`:

\`\`\`typescript
{
  id: 'todo',
  title: 'To Do',
  color: '#your-hex-color', // Change this
  taskIds: [],
}
\`\`\`

### Adding New Columns

Add columns to the `BoardState`:

\`\`\`typescript
columns: {
  ...existingColumns,
  'new-column': {
    id: 'new-column',
    title: 'New Column',
    color: '#hexcolor',
    taskIds: [],
  },
},
columnOrder: [...existingOrder, 'new-column'],
\`\`\`

### Styling Customization

All components use Tailwind classes. Customize via:
- `tailwind.config.js` - Theme tokens
- Component className props - Override specific styles
- `index.css` - Global styles

## 🐛 Known Limitations

- No backend persistence (uses localStorage only)
- No user authentication (assignees are just strings)
- No real-time collaboration
- No task dependencies or subtasks
- No time tracking or estimates

## 🔮 Future Enhancements

Possible improvements:
- [ ] Backend API integration
- [ ] Real-time collaboration (WebSockets)
- [ ] Task dependencies and subtasks
- [ ] Time tracking and estimates
- [ ] Custom fields and metadata
- [ ] Export to CSV/JSON
- [ ] Dark mode support
- [ ] Undo/redo functionality
- [ ] Task search and filters
- [ ] Activity log and history

## 📄 License

MIT License - Feel free to use this in your projects!

## 👥 Contributing

Contributions welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 🙏 Acknowledgments

- React team for React 19
- @dnd-kit for the excellent drag-and-drop library
- Tailwind Labs for Tailwind CSS
- Storybook team for component documentation
- Lucide for beautiful icons

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
