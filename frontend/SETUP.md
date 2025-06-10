# Study Spot App - Setup Guide

This app uses **SvelteKit + Supabase + Fly.io** architecture.

## 🏗️ Architecture Overview

- **Frontend & Backend**: SvelteKit (handles both UI and API routes)
- **Database**: Supabase PostgreSQL
- **Deployment**: Fly.io
- **Auth**: Supabase Auth (when needed)

## 🚀 Getting Started

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy:
   - Project URL
   - Anon public key
3. Create your `.env` file:
```bash
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 2. Database Schema

Create the `spots` table in your Supabase SQL editor:

```sql
CREATE TABLE spots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  distance TEXT,
  open_status BOOLEAN DEFAULT true,
  rating JSONB NOT NULL DEFAULT '{"overall": 0, "atmosphere": 0, "comfort": 0, "quiet": 0, "seating": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust as needed)
CREATE POLICY "Allow public read access" ON spots FOR SELECT USING (true);
```

### 3. Local Development

```bash
npm install
npm run dev
```

### 4. Fly.io Deployment

1. Install the Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
2. Login: `flyctl auth login`
3. Create app: `flyctl apps create your-app-name`
4. Set environment variables:
```bash
flyctl secrets set PUBLIC_SUPABASE_URL="your_url"
flyctl secrets set PUBLIC_SUPABASE_ANON_KEY="your_key"
flyctl secrets set PUBLIC_GOOGLE_MAPS_API_KEY="your_key"
```
5. Deploy: `flyctl deploy`

## 📁 Project Structure

```
src/
├── routes/
│   ├── api/spots/          # API endpoints
│   │   ├── +server.ts      # GET /api/spots, POST /api/spots
│   │   └── [id]/+server.ts # GET/PUT/DELETE /api/spots/[id]
│   ├── spots/[id]/
│   │   ├── +page.server.ts # Server-side data loading
│   │   └── +page.svelte    # Spot detail page
│   └── +layout.svelte      # Main layout
├── lib/
│   └── supabase.ts         # Supabase client configuration
└── components/             # Reusable components
```

## 🔗 API Endpoints

- `GET /api/spots` - Get all spots
- `POST /api/spots` - Create new spot
- `GET /api/spots/[id]` - Get specific spot
- `PUT /api/spots/[id]` - Update spot
- `DELETE /api/spots/[id]` - Delete spot

## 🎯 Benefits of This Architecture

1. **Simplified**: Single codebase for frontend and backend
2. **SSR Support**: SEO-friendly with server-side rendering
3. **Type Safety**: Full TypeScript support across the stack
4. **Scalable**: Supabase handles scaling automatically
5. **Cost Effective**: Fly.io offers great pricing for small apps
6. **Real-time**: Can easily add Supabase real-time features 