import KanbanBoard from './components/KanbanBoard/KanbanBoard';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Kanban Board
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Organize your tasks with drag-and-drop functionality
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <KanbanBoard className="h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)] md:h-[calc(100vh-180px)]" />
      </main>
    </div>
  );
}