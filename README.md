🗂️ Kanban Component — React + Storybook

A fully reusable and modular Kanban Board UI component built with React and documented using Storybook.
This component supports drag-and-drop functionality, customizable columns, dynamic card rendering, and can be integrated into any frontend project that requires task management or workflow visualization.

🔗 Live Storybook Demo (Chromatic): https://main--693243cfb9b3531598e78b08.chromatic.com/

🔗 Live Application Demo: https://kanban-component-2yt6.vercel.app/

🔗 GitHub Repository: https://github.com/Sudharsan-6955/kanban-component-sudharsanv

✨ Features

🟥 Dynamic Kanban Columns — Add/edit columns easily using props

🟦 Drag & Drop Support — Move cards between columns smoothly

🟩 Reusable Architecture — Component can be used in any project

📦 Modular File Structure — Clean, scalable, and easy to maintain

📘 Storybook Integration

Shows all UI states

Demonstrates interactions

Useful for testing and documentation

⚡ Fully Responsive UI

🔧 Easy Local Setup

🚀 Technologies Used

React

TypeScript

Storybook

CSS Modules / Plain CSS

Vercel (Deployment)

🛠️ Installation & Local Setup

Follow these steps to run the project locally:

git clone https://github.com/Sudharsan-6955/kanban-component-sudharsanv.git
cd kanban-component
npm install
npm run storybook


This will start Storybook on http://localhost:6006/.

📚 Component Usage Example
import { KanbanBoard } from "./components/KanbanBoard";

const columns = [
  {
    id: "todo",
    title: "To Do",
    cards: [{ id: "1", title: "Task 1" }],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [{ id: "2", title: "Task 2" }],
  },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];

export default function App() {
  return <KanbanBoard columns={columns} />;
}


This is just an example — your real structure may differ depending on your component.

🧪 Storybook Documentation

Every UI state of the Kanban component is documented in Storybook:

Default view

Multiple columns

Drag-and-drop interactions

Empty column state

Card hover/focus

Custom column/card data

Storybook ensures that the component can be visually tested and verified easily.

🌐 Deployment

The Storybook build is deployed on Vercel for easy access and review.
All stories load correctly and reflect exact component behavior.

🔗 Live Demo: https://kanban-component-2yt6.vercel.app/
👨‍💻 Project Purpose

This project was created as part of the Internshala Frontend Assignment to demonstrate:

Component reusability

UI documentation through Storybook

Clean architecture

Interaction-based UI development

Deployment & testing workflow

📝 License

This project is open-source and available under the MIT License.

---

✅ **Final Action:** Storybook successfully published to Chromatic. The public link (https://main--693243cfb9b3531598e78b08.chromatic.com/) is accessible without login and ready for review.