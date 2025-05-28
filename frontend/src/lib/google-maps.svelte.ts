/**
 * Svelte-native Google Maps API Loader - Context7 Best Practices
 * Uses Svelte 5 runes for reactive API loading and state management
 */

// Reactive state for API loading
const apiState = $state({
    isLoaded: false,
    isLoading: false,
    error: null as string | null
});

let loadPromise: Promise<void> | null = null;

export interface GoogleMapsConfig {
    apiKey: string;
    libraries?: string[];
    version?: string;
}

declare global {
    interface Window {
        initGoogleMaps: () => void;
        google: typeof google;
    }
}

/**
 * Load Google Maps JavaScript API with reactive state management
 * @param config Configuration object with API key and optional libraries
 * @returns Promise that resolves when API is loaded
 */
export async function loadGoogleMapsAPI(config: GoogleMapsConfig): Promise<void> {
    // Return existing promise if already loading
    if (loadPromise) {
        return loadPromise;
    }

    // Return immediately if already loaded
    if (apiState.isLoaded && typeof window.google !== 'undefined') {
        return Promise.resolve();
    }

    apiState.isLoading = true;
    apiState.error = null;

    loadPromise = new Promise<void>((resolve, reject) => {
        try {
            // Create script element
            const script = document.createElement('script');
            script.type = 'text/javascript';
            
            // Build URL with libraries (including places for nearby search)
            const libraries = config.libraries || ['places', 'geometry'];
            const version = config.version || 'weekly';
            
            script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=${libraries.join(',')}&v=${version}&callback=initGoogleMaps`;
            
            // Set up global callback
            window.initGoogleMaps = () => {
                apiState.isLoaded = true;
                apiState.isLoading = false;
                apiState.error = null;
                loadPromise = null;
                resolve();
            };

                        script.onerror = () => {                const errorMessage = 'Failed to load Google Maps API';                apiState.isLoading = false;                apiState.error = errorMessage;                loadPromise = null;                reject(new Error(errorMessage));            };

            // Add script to document
            document.head.appendChild(script);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error loading Google Maps API';
            apiState.isLoading = false;
            apiState.error = errorMessage;
            loadPromise = null;
            reject(new Error(errorMessage));
        }
    });

    return loadPromise;
}

/**
 * Reactive getter for API loading state
 */
export const getApiState = () => apiState;

/** * Check if Google Maps API is loaded (reactive) */export function isGoogleMapsLoaded(): boolean {    return apiState.isLoaded && typeof window !== 'undefined' && typeof window.google !== 'undefined';}/** * Check if Google Maps API is currently loading (reactive) */export function isGoogleMapsLoading(): boolean {    return apiState.isLoading;}/** * Get current API error (reactive) */export function getApiError(): string | null {    return apiState.error;}

/**
 * Get API key from environment variables
 * In production, this should come from your environment config
 */
export function getApiKey(): string {
    // For development, you can set this directly or use environment variables
    // In production, load from your secure environment configuration
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error('Google Maps API key not configured. Please set VITE_GOOGLE_MAPS_API_KEY in your environment.');
    }
    
    return apiKey;
}

/**
 * Reset API state (useful for testing or reinitialization)
 */
export function resetApiState() {
    apiState.isLoaded = false;
    apiState.isLoading = false;
    apiState.error = null;
    loadPromise = null;
} 