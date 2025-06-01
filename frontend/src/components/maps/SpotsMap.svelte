<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { MapLibre, Marker, DefaultMarker, Popup } from "svelte-maplibre";
    import type { Map } from "maplibre-gl";
    
    // Get location context
    const location = getContext("location");
    
    // Map configuration
    let map: Map;
    let mapContainer: HTMLElement;
    
    // OpenFreeMap style URLs
    const OPENFREEMAP_STYLES = {
        positron: "https://tiles.openfreemap.org/styles/positron",
        bright: "https://tiles.openfreemap.org/styles/bright", 
        liberty: "https://tiles.openfreemap.org/styles/liberty"
    };
    
    // Default map settings
    let center: [number, number] = $state([-74.006, 40.7128]); // NYC default
    let zoom = $state(12);
    let currentStyle = OPENFREEMAP_STYLES.liberty;
    
    // Places API configuration - COMMENTED OUT FOR NOW
    // const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    // const PLACES_API_BASE_URL = "https://places.googleapis.com/v1/places";
    
    // Component state
    let selectedPlace: any = $state(null);
    let markers: any[] = $state([]);
    let isGettingLocation = $state(false);
    
    // PLACES API FUNCTIONS - COMMENTED OUT FOR NOW
    // Uncomment these when you have your Google Places API key
    
    /*
    // Search for places using Google Places API (New)
    async function searchPlaces(query: string, location?: { lat: number; lng: number }) {
        if (!query.trim() || !GOOGLE_PLACES_API_KEY) return;
        
        isSearching = true;
        try {
            const requestBody: any = {
                textQuery: query,
                pageSize: 10,
                languageCode: "en"
            };
            
            // Add location bias if available
            if (location) {
                requestBody.locationBias = {
                    circle: {
                        center: {
                            latitude: location.lat,
                            longitude: location.lng
                        },
                        radius: 5000 // 5km radius
                    }
                };
            }
            
            const response = await fetch(`${PLACES_API_BASE_URL}:searchText`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
                    "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.photos,places.regularOpeningHours"
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`Places API error: ${response.status}`);
            }
            
            const data = await response.json();
            searchResults = data.places || [];
            
            // Clear existing markers
            markers = [];
            
            // Add markers for search results
            searchResults.forEach((place, index) => {
                if (place.location) {
                    markers.push({
                        id: place.id,
                        lngLat: [place.location.longitude, place.location.latitude],
                        place: place
                    });
                }
            });
            
        } catch (error) {
            console.error("Error searching places:", error);
            searchResults = [];
        } finally {
            isSearching = false;
        }
    }
    
    // Get place details using Place ID
    async function getPlaceDetails(placeId: string) {
        if (!GOOGLE_PLACES_API_KEY) return null;
        
        try {
            const response = await fetch(`${PLACES_API_BASE_URL}/${placeId}`, {
                headers: {
                    "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
                    "X-Goog-FieldMask": "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,primaryType,photos,regularOpeningHours,phoneNumber,websiteUri,reviews"
                }
            });
            
            if (!response.ok) {
                throw new Error(`Place Details API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Error getting place details:", error);
            return null;
        }
    }
    */
    
    // TEMPORARY: Add some demo markers to show the map functionality
    // Remove this when you enable Places API
    function addDemoMarkers() {
        markers = [
            {
                id: "demo-1",
                lngLat: [-74.006, 40.7128],
                place: {
                    displayName: { text: "Demo Study Spot 1" },
                    formattedAddress: "New York, NY",
                    rating: 4.5
                }
            },
            {
                id: "demo-2", 
                lngLat: [-74.010, 40.7150],
                place: {
                    displayName: { text: "Demo Cafe" },
                    formattedAddress: "Manhattan, NY",
                    rating: 4.2
                }
            },
            {
                id: "demo-3",
                lngLat: [-74.000, 40.7100],
                place: {
                    displayName: { text: "Demo Library" },
                    formattedAddress: "Downtown, NY", 
                    rating: 4.8
                }
            }
        ];
        console.log("Demo markers added:", markers.length, "markers");
        console.log("Current map center:", center);
        console.log("Current zoom:", zoom);
    }
    
    // Handle marker click - SIMPLIFIED FOR NOW
    async function handleMarkerClick(marker: any) {
        // For demo markers, just show basic info
        selectedPlace = {
            displayName: { text: marker.place.displayName.text },
            formattedAddress: marker.place.formattedAddress,
            rating: marker.place.rating
        };
        
        // Center map on selected place
        if (map && marker.lngLat) {
            map.flyTo({
                center: marker.lngLat,
                zoom: 16,
                duration: 1000
            });
        }
        
        // UNCOMMENT WHEN PLACES API IS READY:
        // selectedPlace = await getPlaceDetails(marker.place.id);
    }
    
    // Get user's current location
    async function getCurrentLocation() {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported");
            return;
        }
        
        isGettingLocation = true;
        
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                });
            });
            
            center = [position.coords.longitude, position.coords.latitude];
            zoom = 14;
            
            if (map) {
                map.flyTo({
                    center: center,
                    zoom: zoom,
                    duration: 1000
                });
            }
        } catch (error) {
            console.error("Error getting location:", error);
        } finally {
            isGettingLocation = false;
        }
    }
    
    // Format price level - KEEPING FOR FUTURE USE
    function formatPriceLevel(priceLevel: string): string {
        const levels: Record<string, string> = {
            "PRICE_LEVEL_FREE": "Free",
            "PRICE_LEVEL_INEXPENSIVE": "$",
            "PRICE_LEVEL_MODERATE": "$$", 
            "PRICE_LEVEL_EXPENSIVE": "$$$",
            "PRICE_LEVEL_VERY_EXPENSIVE": "$$$$"
        };
        return levels[priceLevel] || "";
    }
    
    // Format opening hours - KEEPING FOR FUTURE USE
    function formatOpeningHours(openingHours: any): string {
        if (!openingHours?.weekdayDescriptions) return "Hours not available";
        return openingHours.weekdayDescriptions.join(", ");
    }
    
    onMount(() => {
        console.log("Component mounted");
        
        // Add demo markers to show functionality
        addDemoMarkers();
        
        // Try to get user's location on mount
        getCurrentLocation();
    });

    // Handle map load event to add missing image handler
    function handleMapLoad() {
        if (map) {
            console.log("Map loaded successfully");
            
            // Handle missing style images gracefully
            map.on('styleimagemissing', (e) => {
                // Create a simple colored circle as fallback for missing icons
                const size = 24;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                if (ctx) {
                    // Draw a simple colored circle
                    ctx.fillStyle = '#666666';
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Get ImageData and add the fallback image to the map
                    const imageData = ctx.getImageData(0, 0, size, size);
                    map.addImage(e.id, imageData);
                }
            });
            
            // Ensure markers are visible after map loads
            if (markers.length === 0) {
                console.log("No markers found, adding demo markers...");
                addDemoMarkers();
            }
        }
    }
</script>

<div class="map-container">
    <!-- Map Controls (Location Button) -->
    <div class="map-controls">
        <!-- Location Button -->
        <button 
            class="location-button" 
            onclick={getCurrentLocation} 
            disabled={isGettingLocation}
            title={isGettingLocation ? "Getting location..." : "Get current location"}
        >
            {#if isGettingLocation}
                <span class="spinner">⟳</span>
            {:else}
                📍
            {/if}
        </button>
        
        <!-- Debug button to center on NYC -->
        <button 
            class="location-button" 
            onclick={() => {
                console.log("Centering on NYC");
                center = [-74.006, 40.7128];
                zoom = 14;
                if (map) {
                    map.flyTo({ center: [-74.006, 40.7128], zoom: 14 });
                }
            }}
            title="Center on NYC (where markers should be)"
        >
            🗽
        </button>
    </div>
    
    <!-- Map -->
    <div class="map-wrapper">
        <MapLibre
            bind:map
            style={currentStyle}
            {center}
            {zoom}
            class="map"
            standardControls
            onload={handleMapLoad}
            attributionControl={{
                customAttribution: "© OpenFreeMap © OpenMapTiles © OpenStreetMap contributors"
            }}
        >
            <!-- Demo markers -->
            {#each markers as marker (marker.id)}
                <Marker 
                    lngLat={marker.lngLat}
                    draggable={false}
                    onclick={() => handleMarkerClick(marker)}
                    class="custom-marker"
                >
                    <span class="marker-label">
                        {marker.place.displayName.text.slice(0, 3).toUpperCase()}
                    </span>

                    <Popup offset={[0, -10]}>
                        <div class="popup-content">
                            <h3 class="popup-title">{marker.place.displayName.text}</h3>
                            <p class="popup-address">{marker.place.formattedAddress}</p>
                            {#if marker.place.rating}
                                <p class="popup-rating">⭐ {marker.place.rating}</p>
                            {/if}
                        </div>
                    </Popup>
                </Marker>
            {/each}
            
            <!-- Test marker - should always be visible -->
            <Marker lngLat={[-74.006, 40.7128]}>
                <div style="background: red; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">
                    !
                </div>
            </Marker>
        </MapLibre>
    </div>
    
    <!-- Demo Notice -->
    <div class="demo-notice">
        <p>🗺️ <strong>Map Demo Mode</strong> - Showing sample markers. Places API search will be enabled once configured.</p>
    </div>
    
    <!-- Place Details Panel - SIMPLIFIED FOR DEMO -->
    {#if selectedPlace}
        <div class="details-panel">
            <div class="details-header">
                <h3>{selectedPlace.displayName?.text || "Place Details"}</h3>
                <button class="close-button" onclick={() => selectedPlace = null}>×</button>
            </div>
            
            <div class="details-content">
                <p class="address">{selectedPlace.formattedAddress}</p>
                
                <div class="details-meta">
                    {#if selectedPlace.rating}
                        <div class="rating-section">
                            <span class="rating">⭐ {selectedPlace.rating.toFixed(1)}</span>
                            <span class="rating-count">(Demo data)</span>
                        </div>
                    {/if}
                    
                    <div class="demo-info">
                        <p><em>This is demo data. Full place details will be available with Places API.</em></p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .map-container {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    .map-controls {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 1000;
        display: flex;
        gap: 1rem;
        align-items: center;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .location-button {
        padding: 0.75rem;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 0.375rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 3rem;
        min-height: 3rem;
    }
    
    .location-button:hover:not(:disabled) {
        background: #059669;
    }
    
    .location-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }
    
    .spinner {
        display: inline-block;
        animation: spin 1s linear infinite;
        font-size: 1.2rem;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .map-wrapper {
        flex: 1;
        position: relative;
    }
    
    :global(.map) {
        width: 100%;
        height: 100%;
    }
    
    .rating {
        color: #f59e0b;
        font-weight: 500;
    }
    
    .price-level {
        color: #10b981;
        font-weight: 500;
    }
    
    .place-type {
        color: #6366f1;
        font-weight: 500;
        text-transform: capitalize;
    }
    
    .details-panel {
        position: absolute;
        top: 6rem;
        right: 1rem;
        width: 400px;
        max-height: 70vh;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        overflow: hidden;
    }
    
    .details-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .details-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
        color: #1e293b;
    }
    
    .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
    }
    
    .close-button:hover {
        background: #e2e8f0;
        color: #1e293b;
    }
    
    .details-content {
        padding: 1rem;
        max-height: calc(70vh - 4rem);
        overflow-y: auto;
    }
    
    .address {
        margin: 0 0 1rem 0;
        color: #64748b;
        font-size: 0.875rem;
        line-height: 1.4;
    }
    
    .details-meta > div {
        margin-bottom: 0.75rem;
    }
    
    .rating-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .rating-count {
        color: #64748b;
        font-size: 0.875rem;
    }
    
    .details-meta a {
        color: #3b82f6;
        text-decoration: none;
    }
    
    .details-meta a:hover {
        text-decoration: underline;
    }
    
    .hours {
        margin: 0.25rem 0 0 0;
        font-size: 0.875rem;
        color: #64748b;
        line-height: 1.4;
    }
    
    .reviews-section {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #e2e8f0;
    }
    
    .reviews-section h4 {
        margin: 0 0 1rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #1e293b;
    }
    
    .review {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #f1f5f9;
    }
    
    .review:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .reviewer {
        font-weight: 500;
        color: #1e293b;
        font-size: 0.875rem;
    }
    
    .review-rating {
        color: #f59e0b;
        font-size: 0.875rem;
    }
    
    .review-text {
        margin: 0;
        font-size: 0.875rem;
        color: #64748b;
        line-height: 1.4;
    }
    
    .loading {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .map-controls {
            flex-direction: column;
            gap: 0.75rem;
            top: 0.5rem;
            right: 0.5rem;
        }
        
        .results-panel,
        .details-panel {
            left: 0.5rem;
            right: 0.5rem;
            width: auto;
        }
        
        .details-panel {
            top: auto;
            bottom: 1rem;
            max-height: 50vh;
        }
    }
    
    .demo-notice {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        text-align: center;
    }
    
    .demo-notice p {
        margin: 0;
        font-size: 0.875rem;
    }
    
    .demo-info {
        margin-top: 1rem;
        padding: 0.75rem;
        background: #f8fafc;
        border-radius: 0.375rem;
        border-left: 4px solid #3b82f6;
    }
    
    .demo-info p {
        margin: 0;
        color: #64748b;
        font-size: 0.875rem;
    }

    /* Custom marker styles (equivalent to Tailwind classes from example) */
    :global(.custom-marker) {
        display: grid;
        height: 2rem;           /* h-8 */
        width: 2rem;            /* w-8 */
        place-items: center;    /* place-items-center */
        border-radius: 50%;     /* rounded-full */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        background-color: #fca5a5; /* bg-red-300 */
        color: #000000;         /* text-black */
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    :global(.custom-marker:hover) {
        background-color: #f87171; /* Slightly darker on hover */
        transform: scale(1.1);
    }
    
    :global(.custom-marker:focus) {
        outline: 2px solid #000000; /* focus:outline-2 focus:outline-black */
        outline-offset: 2px;
    }
    
    .marker-label {
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
    }
    
    /* Popup styles */
    .popup-content {
        background: white;
        padding: 0.75rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        min-width: 200px;
    }
    
    .popup-title {
        font-weight: 700;
        font-size: 1.125rem;
        margin: 0 0 0.5rem 0;
        color: #1f2937;
    }
    
    .popup-address {
        font-size: 0.875rem;
        color: #6b7280;
        margin: 0 0 0.5rem 0;
    }
    
    .popup-rating {
        font-size: 0.875rem;
        margin: 0;
        color: #374151;
    }
</style>
