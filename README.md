# StudySpot (WIP)

This is the Svelte frontend for the StudySpot application, providing an interactive map interface for finding and exploring study spots.

## Features

- Interactive map powered by MapLibre GL JS
- Place search using backend API
- Study spot discovery
- Detailed place information with reviews, hours, and contact info
- Responsive design for desktop and mobile
- Real-time location services

## Environment Variables

Create a `.env` file in the frontend directory:

```bash
# Backend API URL (defaults to localhost:8080 if not set)
VITE_API_URL=http://localhost:8080
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables (see above)

3. Start the development server:
```bash
npm run dev
```

4. Make sure the backend is running on port 8080 (or your configured port)

## Project Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── backend.ts     # Backend API client
│   │   └── places.ts      # Legacy Places API (deprecated)
│   ├── stores/            # Svelte stores for state management
│   └── utils/             # Utility functions
├── components/
│   ├── common/            # Reusable UI components
│   ├── maps/
│   │   └── SpotsMap.svelte # Main map component
│   └── spots/             # Spot-related components
├── routes/                # SvelteKit routes
└── styles/                # Global styles
```

## Map Component

The main map component (`SpotsMap.svelte`) provides:

- **Search functionality**: Search for any type of place
- **Study spot discovery**: Find cafes, libraries, and study-friendly venues
- **Location services**: Get current location and search nearby
- **Place details**: View detailed information about selected places
- **Interactive markers**: Click markers to see place information

### Key Features

1. **Search Bar**: Enter any query to search for places
2. **Location Button**: Get your current location and search nearby study spots
3. **Study Spots Button**: Find study-friendly places near the current map center
4. **Place Markers**: Different icons for different place types (📚 libraries, ☕ cafes, etc.)
5. **Details Panel**: Click any marker to see detailed place information

## API Integration

The frontend now uses the Go backend instead of direct Google Places API calls:

- `POST /api/places/search` - Text-based place search
- `GET /api/places/study-spots` - Find study-friendly places
- `GET /api/places/details/{id}` - Get detailed place information

This approach provides better:
- Security (API keys protected on server)
- Caching and rate limiting
- Error handling
- Future extensibility

## Map Styles

The app uses OpenFreeMap for tile serving with the Liberty style. This provides:
- Free, open-source map tiles
- No API key required
- Good performance and coverage

## Mobile Support

The interface is fully responsive with:
- Touch-friendly controls
- Optimized layout for small screens
- Mobile-friendly popup and detail panels

## Development

### Adding New Features

1. **New API endpoints**: Add them to `src/lib/api/backend.ts`
2. **UI components**: Create in appropriate subdirectories
3. **Map functionality**: Extend `SpotsMap.svelte`
4. **Styling**: Use the existing CSS structure with CSS variables

### Building for Production

```bash
npm run build
```

The built app will be in the `build/` directory.

## Troubleshooting

### Map not loading
- Check that MapLibre GL JS is properly imported
- Verify internet connection for tile loading

### No search results
- Ensure backend is running and accessible
- Check browser console for API errors
- Verify backend has Google Places API key configured

### Location services not working
- Ensure HTTPS in production (geolocation requires secure context)
- Check browser permissions for location access 










