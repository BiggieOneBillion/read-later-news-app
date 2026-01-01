# Project Setup Guide

Follow these steps to set up the **Read Now Or Later News App** for local development.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Version 9 or higher.
- **MongoDB**: A running instance (local or Atlas).
- **Supabase**: A Supabase project for authentication/storage.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BiggieOneBillion/read-later-news-app.git
   cd read-newsletter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB Connection String
MONGO_URL=your_mongodb_connection_string

# Supabase Configuration
SUPABASE_KEY=your_supabase_ann_key
# The Supabase URL is hardcoded in src/libs/supabase.js, 
# but you might want to move it to env in the future.
```

## Running the Application

1. **Development Mode:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

2. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

## Database Setup

### MongoDB
The app uses MongoDB via Mongoose to store saved news articles. Ensure your `MONGO_URL` points to a valid database. The models are automatically synchronized on connection.

### Supabase
The app uses Supabase for client-side interactions (likely auth or storage). Make sure to provide the `SUPABASE_KEY` from your Supabase dashboard.
