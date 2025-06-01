# Maps Component Setup Guide

This guide will help you set up the StudySpot maps component using OpenFreeMap tiles and Google Places API.

## Prerequisites

1. **Google Cloud Console Account**: You'll need a Google Cloud Console account to get a Places API key
2. **Places API (New) Enabled**: Make sure the Places API (New) is enabled in your Google Cloud project

## Setup Instructions

### 1. Get Google Places API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API (New)** in the API Library
4. Go to **APIs & Services > Credentials**
5. Click **Create Credentials > API Key**
6. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```env
# Google Places API Key
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# OpenFreeMap style URLs (these are public and don't require API keys)
VITE_OPENFREEMAP_STYLE_POSITRON=https://tiles.openfreemap.org/styles/positron
VITE_OPENFREEMAP_STYLE_BRIGHT=https://tiles.openfreemap.org/styles/bright
VITE_OPENFREEMAP_STYLE_LIBERTY=https://tiles.openfreemap.org/styles/liberty

# Optional: Default map center (longitude, latitude)
VITE_DEFAULT_MAP_CENTER_LNG=-74.006
VITE_DEFAULT_MAP_CENTER_LAT=40.7128

# Optional: Default map zoom level
VITE_DEFAULT_MAP_ZOOM=12
```

Replace `your_google_places_api_key_here` with your actual API key.

### 3. API Key Security (Important!)

For production, make sure to:

1. **Restrict your API key** in the Google Cloud Console:
   - Go to **APIs & Services > Credentials**
   - Click on your API key
   - Under **Application restrictions**, select **HTTP referrers**
   - Add your domain(s) (e.g., `yourdomain.com/*`)

2. **Restrict API access**:
   - Under **API restrictions**, select **Restrict key**
   - Choose **Places API (New)**

### 4. Install Dependencies

The required dependencies are already included in `package.json`:

- `svelte-maplibre`: For the map component
- `svelte-motion`: For animations

Run `npm install` to ensure all dependencies are installed.

## Features

The maps component includes:

### 🗺️ **OpenFreeMap Integration**
- Free, open-source map tiles from [OpenFreeMap.org](https://openfreemap.org/)
- Multiple map styles: Positron (light), Bright, and Liberty
- No API key required for map tiles
- Proper attribution included

### 🔍 **Google Places API (New) Integration**
- Text search for study spots, cafes, libraries, etc.
- Place details with ratings, reviews, hours, and contact info
- Location-based search bias
- Modern Places API (New) with enhanced data

### 📍 **Interactive Features**
- Click markers to see place details
- Search results panel with place information
- Detailed place information panel
- Current location detection
- Map style switching
- Mobile-responsive design

### 🎯 **Study-Focused**
- Optimized for finding study-friendly locations
- Displays ratings, price levels, and hours
- Shows reviews to help students choose spots
- Filters for cafes, libraries, and study-friendly venues

## Usage

```svelte
<script>
  import SpotsMap from '$lib/components/maps/SpotsMap.svelte';
</script>

<SpotsMap />
```

## API Costs

### OpenFreeMap
- **Completely free** with no usage limits
- No API key required
- Donations appreciated to support the service

### Google Places API (New)
- **Text Search**: $17 per 1,000 requests
- **Place Details**: $17 per 1,000 requests  
- **Free tier**: $200 credit per month (covers ~11,700 requests)

For a typical study spot finder app, the free tier should be sufficient for development and moderate usage.

## Troubleshooting

### Map Not Loading
1. Check that `svelte-maplibre` is installed
2. Verify OpenFreeMap style URLs are accessible
3. Check browser console for errors

### Places Search Not Working
1. Verify your Google Places API key is correct
2. Ensure Places API (New) is enabled in Google Cloud Console
3. Check API key restrictions aren't blocking requests
4. Verify you have sufficient API quota

### CORS Errors
- Google Places API should work from any domain
- If you see CORS errors, check your API key restrictions

## Development

To run the development server:

```bash
cd frontend
npm run dev
```

The maps component will be available at the configured route.

## Production Deployment

1. Set environment variables in your hosting platform
2. Ensure API key restrictions are properly configured
3. Monitor API usage in Google Cloud Console
4. Consider implementing request caching for frequently accessed places

## Attribution Requirements

The component automatically includes proper attribution for:
- OpenFreeMap
- OpenMapTiles  
- OpenStreetMap contributors

Do not remove these attributions as they are required by the data providers.

## Support

- **OpenFreeMap**: [GitHub Issues](https://github.com/hyperknot/openfreemap/issues)
- **svelte-maplibre**: [GitHub Issues](https://github.com/dimfeld/svelte-maplibre/issues)
- **Google Places API**: [Google Cloud Support](https://cloud.google.com/support)

## License

This maps component is part of the StudySpot project. OpenFreeMap and OpenStreetMap data are provided under their respective open licenses. 