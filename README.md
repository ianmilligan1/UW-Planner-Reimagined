# UW Planner Reimagined

A modern, responsive web application for managing university annual planning initiatives. Built as a proof of concept for modernising the University of Waterloo's legacy UW Planner Annual Plan interface. This is mostly just Ian having fun.

## Tech Stack

- **React 19** with Vite for fast development and optimised builds
- **Tailwind CSS v4** for utility-first styling
- **localStorage** for client-side data persistence
- **GitHub Pages** for deployment via GitHub Actions
- Custom components throughout — no UI component libraries

## Features

- Dashboard with clickable status summary cards for filtering
- Sortable initiative table with search and objective filtering
- Slide-over panels for creating, editing, and viewing initiatives with milestone timelines
- CSV export of all initiatives
- Delete confirmation dialogs
- Toast notifications for CRUD operations
- Responsive layout — table stacks to cards on mobile
- Data persists across browser sessions via localStorage

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ianmilligan1/UW-Planner-Reimagined.git
cd UW-Planner-Reimagined

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Why

University of Waterloo's enterprise planning tools were built in an era of server-rendered forms and rigid workflows. This project demonstrates that a modern single-page application can deliver the same functionality with a dramatically better user experience: instant interactions, responsive design, and an interface that feels native to the web rather than bolted onto it.

This is a proof of concept intended for discussion with university administrators about what modernised institutional tools could look like.
