<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { MapLibre, Marker, Popup } from "svelte-maplibre";
    import type { Map } from "maplibre-gl";
    import { backendAPI, type BackendPlace, formatPriceLevel, formatOpeningHours } from "$lib/api/backend";
    
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
    
    // Component state
    let selectedPlace: BackendPlace | null = $state(null);
    let markers: Array<{ id: string; lngLat: [number, number]; place: BackendPlace }> = $state([]);
    let isGettingLocation = $state(false);
    let isSearching = $state(false);
    let searchQuery = $state("");
    let error = $state("");
    
    // Search for places using backend API
    async function searchPlaces() {
        if (!searchQuery.trim()) return;
        
        isSearching = true;
        error = "";
        
        try {
            const result = await backendAPI.searchPlaces(
                searchQuery, 
                center[1], // latitude
                center[0], // longitude
                5000 // 5km radius
            );
            
            // Clear existing markers
            markers = [];
            
            // Add markers for search results
            result.places.forEach((place) => {
                if (place.location) {
                    markers.push({
                        id: place.id,
                        lngLat: [place.location.longitude, place.location.latitude],
                        place: place
                    });
                }
            });
            
        } catch (err) {
            console.error("Error searching places:", err);
            error = err instanceof Error ? err.message : "Failed to search places";
        } finally {
            isSearching = false;
        }
    }
    
    // Search for study spots near current location
    async function searchStudySpots() {
        isSearching = true;
        error = "";
        
        try {
            const result = await backendAPI.searchStudySpots(
                center[1], // latitude
                center[0], // longitude
                5000 // 5km radius
            );
            
            // Clear existing markers
            markers = [];
            
            // Add markers for search results
            result.places.forEach((place) => {
                if (place.location) {
                    markers.push({
                        id: place.id,
                        lngLat: [place.location.longitude, place.location.latitude],
                        place: place
                    });
                }
            });
            
        } catch (err) {
            console.error("Error searching study spots:", err);
            error = err instanceof Error ? err.message : "Failed to search study spots";
        } finally {
            isSearching = false;
        }
    }
    
    // Handle marker click
    async function handleMarkerClick(marker: { id: string; lngLat: [number, number]; place: BackendPlace }) {
        // Get detailed place information
        try {
            const details = await backendAPI.getPlaceDetails(marker.place.id);
            selectedPlace = details || marker.place;
        } catch (err) {
            console.error("Error getting place details:", err);
            selectedPlace = marker.place; // Fallback to basic info
        }
        
        // Center map on selected place
        if (map && marker.lngLat) {
            map.flyTo({
                center: marker.lngLat,
                zoom: 16,
                duration: 1000
            });
        }
    }
    
    // Get user's current location
    async function getCurrentLocation() {
        if (!navigator.geolocation) {
            error = "Geolocation is not supported";
            return;
        }
        
        isGettingLocation = true;
        error = "";
        
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
            
            // Automatically search for study spots at current location
            await searchStudySpots();
            
        } catch (err) {
            console.error("Error getting location:", err);
            error = "Unable to get your location";
        } finally {
            isGettingLocation = false;
        }
    }
    
    // Handle map load event
    function handleMapLoad() {
        if (map) {
            console.log("Map loaded successfully");
            
            // Handle missing style images gracefully
            map.on('styleimagemissing', (e) => {
                const size = 24;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                if (ctx) {
                    ctx.fillStyle = '#666666';
                    ctx.beginPath();
                    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
                    ctx.fill();
                    
                    const imageData = ctx.getImageData(0, 0, size, size);
                    map.addImage(e.id, imageData);
                }
            });
        }
    }
    
    // Handle search input key press
    function handleSearchKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            searchPlaces();
        }
    }
    
    onMount(() => {
        console.log("SpotsMap component mounted");
        
        // Try to get user's location on mount
        getCurrentLocation();
    });
</script>

<div class="map-container">
    <!-- Search and Controls -->
    <div class="map-controls">
        <!-- Search Bar -->
        <div class="search-container">
            <input 
                type="text" 
                bind:value={searchQuery}
                onkeypress={handleSearchKeyPress}
                placeholder="Search for places..."
                class="search-input"
                disabled={isSearching}
            />
            <button 
                onclick={searchPlaces} 
                disabled={isSearching || !searchQuery.trim()}
                class="search-button"
                title="Search places"
            >
                {#if isSearching}
                    <span class="spinner">⟳</span>
                {:else}
                    🔍
                {/if}
            </button>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
            <button 
                class="action-button" 
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
            
            <button 
                class="action-button" 
                onclick={searchStudySpots} 
                disabled={isSearching}
                title="Find study spots nearby"
            >
                {#if isSearching}
                    <span class="spinner">⟳</span>
                {:else}
                    📚
                {/if}
            </button>
        </div>
    </div>
    
    <!-- Error Display -->
    {#if error}
        <div class="error-notice">
            <p>❌ {error}</p>
            <button onclick={() => error = ""} class="close-error">×</button>
        </div>
    {/if}
    
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
            <!-- Place markers -->
            {#each markers as marker (marker.id)}
                <Marker 
                    lngLat={marker.lngLat}
                    draggable={false}
                    onclick={() => handleMarkerClick(marker)}
                    class="custom-marker"
                >
                    <div class="marker-icon">
                        {#if marker.place.primaryType === 'library'}
                            📚
                        {:else if marker.place.primaryType === 'cafe'}
                            ☕
                        {:else if marker.place.primaryType === 'restaurant'}
                            🍽️
                        {:else}
                            📍
                        {/if}
                    </div>

                    <Popup offset={[0, -10]}>
                        <div class="popup-content">
                            <h3 class="popup-title">{marker.place.displayName?.text || "Place"}</h3>
                            <p class="popup-address">{marker.place.formattedAddress}</p>
                            {#if marker.place.rating}
                                <p class="popup-rating">⭐ {marker.place.rating.toFixed(1)}</p>
                            {/if}
                            {#if marker.place.priceLevel}
                                <p class="popup-price">{formatPriceLevel(marker.place.priceLevel)}</p>
                            {/if}
                        </div>
                    </Popup>
                </Marker>
            {/each}
        </MapLibre>
    </div>
    
    <!-- Place Details Panel -->
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
                            {#if selectedPlace.userRatingCount}
                                <span class="rating-count">({selectedPlace.userRatingCount} reviews)</span>
                            {/if}
                        </div>
                    {/if}
                    
                    {#if selectedPlace.priceLevel}
                        <div class="price-section">
                            <span class="price-level">💰 {formatPriceLevel(selectedPlace.priceLevel)}</span>
                        </div>
                    {/if}
                    
                    {#if selectedPlace.primaryType}
                        <div class="type-section">
                            <span class="place-type">🏷️ {selectedPlace.primaryType.replace(/_/g, ' ')}</span>
                        </div>
                    {/if}
                    
                    {#if selectedPlace.phoneNumber}
                        <div class="contact-section">
                            <a href="tel:{selectedPlace.phoneNumber}" class="phone-link">📞 {selectedPlace.phoneNumber}</a>
                        </div>
                    {/if}
                    
                    {#if selectedPlace.websiteUri}
                        <div class="contact-section">
                            <a href={selectedPlace.websiteUri} target="_blank" rel="noopener noreferrer" class="website-link">
                                🌐 Visit Website
                            </a>
                        </div>
                    {/if}
                    
                    {#if selectedPlace.regularOpeningHours}
                        <div class="hours-section">
                            <h4>Hours</h4>
                            <p class="hours">{formatOpeningHours(selectedPlace.regularOpeningHours)}</p>
                            {#if selectedPlace.regularOpeningHours.openNow !== undefined}
                                <p class="open-status" class:open={selectedPlace.regularOpeningHours.openNow}>
                                    {selectedPlace.regularOpeningHours.openNow ? "🟢 Open now" : "🔴 Closed"}
                                </p>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
    
    <!-- Results Info -->
    {#if markers.length > 0 && !isSearching}
        <div class="results-info">
            <p>Found {markers.length} places</p>
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
        left: 1rem;
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
    
    .search-container {
        display: flex;
        flex: 1;
        gap: 0.5rem;
    }
    
    .search-input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.375rem;
        font-size: 1rem;
        transition: border-color 0.2s;
    }
    
    .search-input:focus {
        outline: none;
        border-color: #3b82f6;
    }
    
    .search-input:disabled {
        background-color: #f1f5f9;
        cursor: not-allowed;
    }
    
    .search-button,
    .action-button {
        padding: 0.75rem;
        background: #3b82f6;
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
    
    .search-button:hover:not(:disabled),
    .action-button:hover:not(:disabled) {
        background: #2563eb;
    }
    
    .search-button:disabled,
    .action-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }
    
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .action-button {
        background: #10b981;
    }
    
    .action-button:hover:not(:disabled) {
        background: #059669;
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
    
    .error-notice {
        position: absolute;
        top: 6rem;
        left: 1rem;
        right: 1rem;
        background: rgba(239, 68, 68, 0.95);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .error-notice p {
        margin: 0;
        font-size: 0.875rem;
    }
    
    .close-error {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .results-info {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }
    
    .results-info p {
        margin: 0;
        font-size: 0.875rem;
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
    
    .rating {
        color: #f59e0b;
        font-weight: 500;
    }
    
    .rating-count {
        color: #64748b;
        font-size: 0.875rem;
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
    
    .phone-link,
    .website-link {
        color: #3b82f6;
        text-decoration: none;
        font-size: 0.875rem;
    }
    
    .phone-link:hover,
    .website-link:hover {
        text-decoration: underline;
    }
    
    .hours {
        margin: 0.25rem 0 0 0;
        font-size: 0.875rem;
        color: #64748b;
        line-height: 1.4;
    }
    
    .open-status {
        margin: 0.5rem 0 0 0;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .open-status.open {
        color: #10b981;
    }
    
    .hours-section h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #1e293b;
    }
    
    /* Custom marker styles */
    .marker-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: white;
        border: 2px solid #3b82f6;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1.2rem;
    }
    
    .marker-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
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
    
    .popup-rating,
    .popup-price {
        font-size: 0.875rem;
        margin: 0.25rem 0;
        color: #374151;
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .map-controls {
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .search-container {
            width: 100%;
        }
        
        .action-buttons {
            width: 100%;
            justify-content: center;
        }
        
        .details-panel {
            left: 1rem;
            right: 1rem;
            width: auto;
            top: auto;
            bottom: 1rem;
            max-height: 50vh;
        }
    }
</style>
