# Personal Project Showcase

A responsive React single-page app for adding, browsing, and searching creative projects. Projects persist in the current browser using localStorage.

## Features

- Browse starter projects and newly added work.
- Add projects with required title and description fields.
- Search project titles and descriptions without case sensitivity.
- Save projects locally and validate saved data on startup.
- Responsive layout for phone and desktop screens.

## Setup and usage

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Add a project with a title and description, or use the search field to filter the collection. Run the tests and production checks with:

```bash
npm test
npm run build
npm run lint
```

## Structure

```text
src/
├── App.jsx
├── components/
├── data/
├── hooks/
├── tests/
├── App.css
└── main.jsx
```

`App` owns the shared search query and project list (through `useProjects`). The form owns its input/validation state, while `SearchBar`, `ProjectList`, and `ProjectCard` receive the props they need. The project list is derived from the query rather than duplicated in state.

## Known limitations

- Projects are stored per browser; there is no server-side account or synchronization.
- Project editing, deletion, and image uploads are not implemented.
- This is a single-page showcase and does not need client-side routing.
# SPA-with-React-Portfolio-Platform
