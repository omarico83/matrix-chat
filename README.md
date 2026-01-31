# Task API

A simple REST API for task management built with TypeScript and Express.

## Features

- Create, read, update, and delete tasks
- Task status tracking (pending, in_progress, completed)
- RESTful API design

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a task by ID |
| POST | /api/tasks | Create a new task |
| PATCH | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| GET | /health | Health check |

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/         # TypeScript interfaces and types
├── repositories/   # Data access layer
├── routes/         # Express route definitions
├── services/       # Business logic
├── app.ts          # Express app setup
└── index.ts        # Entry point
```
