# Google Maps API Setup Guide - Svelte-Native Implementation

This project uses the Google Maps JavaScript API with Places library integration following Context7 best practices and Svelte 5 runes for reactive state management.

## Prerequisites

1. **Google Cloud Console Account**: You need a Google Cloud Console account to get an API key.
2. **Billing Enabled**: Google Maps API requires billing to be enabled (though there's a generous free tier).

## Setup Steps

### 1. Get Your Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API** (required)
   - **Places API** (required)
   - **Geocoding API** (optional, for address lookups)
   - **Directions API** (optional, for routing)

4. Go to "Credentials" and create a new API key
5. Restrict your API key for security:
   - **Application restrictions**: HTTP referrers (web sites)
   - **API restrictions**: Select only the APIs you enabled above

### 2. Configure Your Environment

Create a `.env` file in the `frontend` directory:

```bash
# frontend/.env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Important**: 
- Never commit your `.env` file to version control
- The `.env` file should be in your `.gitignore`
- Use `VITE_` prefix for environment variables in Vite

### 3. Development vs Production

**Development:**
```bash
# frontend/.env.local
VITE_GOOGLE_MAPS_API_KEY=your_development_api_key
```

**Production:**
Set the environment variable in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Follow their environment variable setup guide

## Svelte-Native Context7 Integration Features

This implementation follows Context7 best practices with Svelte 5 patterns:

### 1. **Reactive State Management with Runes**
- `$state` runes for reactive map state
- `$derived` runes for computed values
- `$effect` runes for side effects
- Global state management with reactive stores

### 2. **Svelte Context API Integration**
- Context providers for sharing map state
- Hooks for easy state access
- Type-safe context consumption

### 3. **Architecture**

```
frontend/src/lib/
├── stores/
│   └── map.svelte.ts          # Global reactive map state
├── context/
│   └── map.svelte.ts          # Context provider
├── google-maps.svelte.ts      # Reactive API loader
└── places-service.svelte.ts   # Reactive Places service
```

### 4. **Key Components**

**Map Store (`stores/map.svelte.ts`)**:
- Reactive state using `$state` rune
- Derived stats with `$derived`
- Action methods for state updates
- Type-safe state management

**API Loader (`google-maps.svelte.ts`)**:
- Reactive API loading state
- Promise-based loading with error handling
- Environment variable integration
- TypeScript support

**Places Service (`places-service.svelte.ts`)**:
- Reactive Places API integration
- Automatic state updates
- Error handling and fallbacks
- Distance calculations

**Context Provider (`context/map.svelte.ts`)**:
- Svelte context for state sharing
- Custom hooks for easy access
- Type-safe context consumption

### 5. **Usage Patterns**

**In your main component:**
```svelte
<script>
    import { setMapContext } from '$lib/context/map.svelte';
    
    // Provide map context to children
    setMapContext();
</script>
```

**In child components:**
```svelte
<script>
    import { useMapState, useMapActions } from '$lib/context/map.svelte';
    
    const mapState = useMapState();
    const mapActions = useMapActions();
    
    // Reactive values
    const loading = $derived(mapState.loading);
    const spots = $derived(mapState.spots);
</script>
```

### 6. **Performance Optimizations**
- Lazy loading of API scripts
- Efficient marker management with global state
- Reactive updates only when needed
- Automatic cleanup on component destruction

### 7. **Error Handling**
- Graceful fallbacks to mock data
- User-friendly error messages
- Network error recovery
- Development debugging tools

## API Usage Limits

Google Maps API has usage limits and pricing:

- **Maps JavaScript API**: $7 per 1,000 loads (first 28,000 free monthly)
- **Places API**: $17 per 1,000 requests (first 1,000 free monthly)
- **Geocoding API**: $5 per 1,000 requests (first 40,000 free monthly)

Monitor your usage in the Google Cloud Console.

## Security Best Practices

1. **Restrict your API key** to specific domains
2. **Enable only required APIs**
3. **Monitor usage** regularly
4. **Use environment variables** for API keys
5. **Never expose API keys** in client-side code (use server-side proxy for sensitive operations)

## Troubleshooting

### Common Issues:

1. **"Google Maps API not loaded"**
   - Check your API key is correct
   - Verify the Maps JavaScript API is enabled
   - Check browser console for specific errors

2. **"Places search failed"**
   - Ensure Places API is enabled
   - Check API key restrictions
   - Verify billing is enabled

3. **No markers showing**
   - Check browser location permissions
   - Verify Places API returns results for your location
   - Check console for JavaScript errors

4. **Svelte reactivity issues**
   - Ensure you're using the correct runes (`$state`, `$derived`, `$effect`)
   - Check that context is properly set up
   - Verify imports are using `.svelte.ts` extensions

### Debug Mode:

The implementation includes debug information in development mode:
- Total spots count
- Open spots count
- API readiness status

Add this to your `.env` for more detailed logging:
```bash
VITE_DEBUG_MAPS=true
```

### Development Tools:

In development mode, you'll see debug information in the top-right corner of the map showing:
- Total spots found
- Number of open spots
- API readiness status

## Migration from Legacy Implementation

If migrating from the previous implementation:

1. **Update imports**: Change from `.ts` to `.svelte.ts` extensions
2. **Replace manual state**: Use the global map store instead of local state
3. **Use reactive patterns**: Replace manual updates with reactive runes
4. **Add context**: Use context providers for state sharing

## Support

For Google Maps API issues:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Maps Platform Support](https://developers.google.com/maps/support)

For Svelte and Context7 integration questions:
- Check the implementation in `src/lib/stores/map.svelte.ts`
- Review the context usage in `src/lib/context/map.svelte.ts`
- See the reactive patterns in `src/components/maps/SpotsMap.svelte` 