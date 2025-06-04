# StudySpot Backend

This is the Go backend for the StudySpot application, providing APIs for place search and spot management.

## Features

- Google Places API integration for searching study-friendly locations
- REST API endpoints for place search and details
- Support for both PostgreSQL and Google Firestore databases
- CORS support for frontend integration

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
# Google Places API configuration
GOOGLE_PLACES_API_KEY=AIzaSyBl5tIy-MesKnJSdFBGy-EmlLIZGBpwaFU

# Database configuration
USE_POSTGRES=false
POSTGRES_DSN=postgres://username:password@localhost:5432/database_name?sslmode=disable

# Server configuration
PORT=8080
```

## API Endpoints

### Places API

- `GET /api/places/search?q=query&lat=40.7128&lng=-74.0060&radius=5000`
  - Search for places by text query
  - Optional location bias with latitude, longitude, and radius

- `GET /api/places/study-spots?lat=40.7128&lng=-74.0060&radius=5000`
  - Search for study-friendly places near a location
  - Returns cafes, libraries, and other study-appropriate venues

- `GET /api/places/details/{placeId}`
  - Get detailed information about a specific place
  - Includes reviews, hours, contact info, etc.

### Other Endpoints

- `GET /health` - Health check endpoint
- `GET /spots` - Get all spots from database

## Setup

1. Install dependencies:
```bash
go mod download
```

2. Set up your environment variables (see above)

3. Run the server:
```bash
go run cmd/api/main.go
```

The server will start on port 8080 by default.

## Google Places API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Places API (New)
4. Create credentials (API Key)
5. Add the API key to your environment variables

## Database Setup

### Using PostgreSQL
1. Set `USE_POSTGRES=true`
2. Set `POSTGRES_DSN` with your database connection string
3. Create the necessary tables (migrations coming soon)

## Development

The backend is structured following Go best practices:

- `cmd/` - Application entry points
- `internal/` - Private application code
  - `handlers/` - HTTP request handlers
  - `services/` - Business logic
  - `models/` - Data structures
  - `repository/` - Database interactions
- `pkg/` - Public library code
  - `places/` - Google Places API client

## CORS

The server includes CORS middleware to allow frontend requests from any origin during development. In production, you should configure this to only allow requests from your domain. 