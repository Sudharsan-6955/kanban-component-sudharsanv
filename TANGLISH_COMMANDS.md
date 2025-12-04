# Kanban Board - Tanglish Commands Guide

## Project Setup Commands

### 1. Dependencies Install Pannu
```bash
npm install
```
**ena work**: Project ke sari packages install panna vendum. Package.json la irukka dependencies ellam download aagum.

---

### 2. Development Server Start Pannu
```bash
npm run dev
```
**ena work**: Local development server start aagum. Browser la http://localhost:5173 la open pannu.

---

### 3. Storybook Start Pannu
```bash
npm run storybook
```
**ena work**: Storybook server start aagum. Browser la http://localhost:6006 la open pannu. Components testing la irukkum.

---

### 4. Build Pannu Production Ke
```bash
npm run build
```
**ena work**: Production build create pannu. Code minify aagum and optimized aagum. dist folder la generate aagum.

---

### 5. Preview Build Locally
```bash
npm run preview
```
**ena work**: Production build ke preview pannu locally. npm run build pannathukkappuram irundu run pannu.

---

### 6. TypeScript Check Pannu
```bash
npm run check-types
```
**ena work**: TypeScript errors check pannu. Compile pannathukkappuram type errors irundha identify aagum.

---

### 7. ESLint Check Pannu
```bash
npm run lint
```
**ena work**: Code quality check pannu. ESLint rules follow panni irundha verify aagum.

---

### 8. Vitest Run Pannu (Unit Tests)
```bash
npm run test
```
**ena work**: Unit tests run pannu. Components ke test cases irundha run aagum.

---

### 9. Vitest Watch Mode
```bash
npm run test:watch
```
**ena work**: Test watch mode start pannu. Code change aana immediately tests run aagum.

---

### 10. Build Storybook
```bash
npm run build-storybook
```
**ena work**: Storybook static build create pannu. Deployment ke use pannu.

---

## Git Commands (Deployment Ke Useful)

### 11. Git Status Check Pannu
```bash
git status
```
**ena work**: Current git status check pannu. Modified files, untracked files ellam paakkum.

---

### 12. Stage Files Pannu
```bash
git add .
```
**ena work**: All changed files staging area la add pannu. Commit pannathukkappuram mandatory.

---

### 13. Commit Pannu
```bash
git commit -m "Your commit message"
```
**ena work**: Staged changes commit pannu. Clear message write pannu.

---

### 14. Push to Repository
```bash
git push origin main
```
**ena work**: Local commits remote repository la push pannu. GitHub/GitLab la updates aagum.

---

### 15. Pull Latest Changes
```bash
git pull origin main
```
**ena work**: Remote repository la updates pull pannu. Team member changes local la get aagum.

---

## Project Structure Explanation

```
kanban-component/
├── src/
│   ├── components/          # React components irukku
│   │   └── KanbanBoard/     # Main Kanban board components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── styles/              # Global styles
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── node_modules/            # Dependencies folder
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.ts           # Vite config
└── .gitignore               # Git ignore file
```

---

## Important Notes

- **Development Ke**: `npm run dev` use pannu daily
- **Build Pannathukkappuram**: `npm run build` run pannu
- **Testing**: `npm run test` le run pannu commits pannathukkappuram
- **Deployment**: Production build deploy pannathukkapuram `format.md` gitignore le irukku (push aagadhu)

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process and restart
npm run dev
```

### node_modules Issue
```bash
# Clear and reinstall
rm -r node_modules package-lock.json
npm install
```

### Storybook Issue
```bash
# Clear cache and rebuild
npm run build-storybook
```

---

**Happy Coding! 🚀**
