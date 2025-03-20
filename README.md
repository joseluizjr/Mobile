# FRONTEND BOILERPLATE

<p>Model to be followed for our frontend projects</p>
<p>Created at: 20/02/2025</p>

# Getting Started

#### Pass 1

```
yarn install
```

#### Pass 2

```
yarn dev
```

# Folder architecture

```
├─ .husky
├─ .vscode
├─ public
├─ src
│ ├─ assets
│ ├─ components
│ ├─ hooks
│ ├─ layout
│ ├─ libs
│ ├─ pages
│ ├─ routes
│ ├─ services
│ ├─ styles
│ ├─ templates
│ ├─ test
│ ├─ utils
│ ├─ App.tsx
│ ├─ main.tsx
│ ├─ vite-env.d.ts
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ plopfile.js
├─ .prettierrc
├─ .prettierignore
├─ babel.config.cjs
├─ components.json
├─ Dockerfile
├─ index.html
├─ postcss.config.js
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ .vitest.setup.ts
├─ .vite.config.ts
└─ yarn.lock
```

# Functions of each folder and files

- **ASSETS**: Used to store all static files.
- **COMPONENTS**: Used to store reusable components.
- **HOOKS**: Used to store custom Hooks in projects.
- **LAYOUTS**: Used to store files related to the layout or structure of the user interface.
- **LIBS**: Used to store external library configuration files.
- **PAGES**: Used to organize components or files related to specific pages of the application.
- **ROUTES**: Used to organize files or modules related to the definition of application routes.
- **SERVICES**: Used to store modules or classes responsible for interactions with external services.
- **STYLES**: Used to store theme files and global style.
- **TEST**: Used to store global test settings.
- **TEMPLATES**: Used to store reusable pages or components that use more than one base component..
- **UTILS**: Used to store functions, classes, or modules that contain reusable or utility logic.
- **APP.tsx**: Used to define the main component of the application. This component can include the overall structure of the application, handle routing, and incorporate other components as needed.
- **MAIN.tsx**: It is the file that renders the main component of the application on the HTML page.

# Defaults libs

- Framework
  - [React](https://react.dev/)
  - [Vite] (<https://vitejs.dev/>)
- Form
  - [react-hook-form](https://www.react-hook-form.com/)
  - [zod](https://zod.dev/)
  - [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- Linter
  - [eslint](https://eslint.org/)
  - [prettier](https://prettier.io/)
- Fetcher
  - [axios](https://axios-http.com/ptbr/docs/intro)
  - [react-query](https://tanstack.com/query/v3/)
- Router Manager
  - [react-router-dom](https://reactrouter.com/en/main)
- Style
  - [tailwind](https://tailwindcss.com/)
- Icons
  - [react-icons](https://react-icons.github.io/react-icons/)
- UI
  - [shadcn](https://ui.shadcn.com/)
- Test
  - [vitest](https://vitest.dev/config/)
  - [faker](https://fakerjs.dev/)
  - [testing library](https://testing-library.com/)
  - [msw](https://mswjs.io/)
