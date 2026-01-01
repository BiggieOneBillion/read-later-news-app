# Technical Architecture

This document describes the technical layout and architectural decisions made for the **Read Now Or Later News App**.

## Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Backend**: Next.js API Routes
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
- **Auth/Storage**: [Supabase](https://supabase.com/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## Folder Structure

```text
src/
├── app/              # Next.js App Router (Pages & API Routes)
│   ├── api/          # Serverless functions for data operations
│   ├── user/         # User-specific pages (Dashboard)
│   └── reading/      # Reading experience pages
├── components/       # Reusable React components
│   ├── home/         # Homepage specific components
│   └── user-dashboard/ # Dashboard specific components
├── context/          # React Context providers
├── data/             # Static data or constants
├── libs/             # Third-party library initializations (DB, Supabase)
├── model/            # Mongoose schemas and models
├── store/            # Zustand store definitions
└── validation/      # Zod validation schemas
```

## Data Management

### State Management
The app uses **Zustand** for lightweight global state management, particularly for user sessions and UI states that need to persist across components.

### Server State
**React Query** is used to handle all asynchronous data fetching, caching, and synchronization with the backend API.

### Database Logic
- **Mongoose** handles the connection to MongoDB and defines the schema for `SavedNews` and `User`.
- **Supabase** is integrated for additional backend-as-a-service features, providing a scalable solution for auth and storage.

## API Design

The app exposes several RESTful endpoints under `/api`:
- `POST /api/login`: Handles user authentication.
- `GET /api/read-user-news`: Retrieves the list of saved news for a user.
- `POST /api/save-news`: Saves a new article to the user's list.
- `DELETE /api/save-news/delete`: Removes an article from the list.
