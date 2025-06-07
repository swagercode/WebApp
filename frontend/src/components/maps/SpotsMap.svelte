<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { MapLibre, Marker, Popup } from "svelte-maplibre";
    import type { Map } from "maplibre-gl";
    import { backendAPI, type BackendPlace, formatPriceLevel } from "$lib/api/backend";
    
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
    let currentStyle = OPENFREEMAP_STYLES.positron;
    
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
    
    onMount(() => {
        console.log("SpotsMap component mounted");
        
        getCurrentLocation();
    });
</script>

<div class="map-container">
    <!-- Error Display -->
    {#if error}
        <div class="error-notice">
            <p>{error}</p>
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
        height: 100%;
        display: flex;
        flex-direction: column;
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
        top: 1rem;
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
    
</style>
