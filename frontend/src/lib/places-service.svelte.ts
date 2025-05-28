/**
 * Svelte-native Google Places API Service - Context7 Best Practices
 * Uses Svelte 5 runes for reactive state management and better integration
 */

import { loadGoogleMapsAPI, getApiKey, isGoogleMapsLoaded } from './google-maps.svelte';
import { mapState, mapActions } from './stores/map.svelte';
import type { Spot } from '../components/types';

export interface NearbySearchRequest {
    location: google.maps.LatLng | google.maps.LatLngLiteral;
    radius: number;
    type?: string[];
    keyword?: string;
}

export interface PlacesServiceOptions {
    map: google.maps.Map;
}

/**
 * Enhanced Places API Service Class with Context7 patterns
 */
export class SveltePlacesService {
    private service: google.maps.places.PlacesService;
    private map: google.maps.Map;

    constructor(options: PlacesServiceOptions) {
        this.map = options.map;
        this.service = new google.maps.places.PlacesService(options.map);
    }

    /**
     * Get the underlying Places service for global state management
     */
    public getService(): google.maps.places.PlacesService {
        return this.service;
    }

    /**
     * Search for nearby study spots using Places API (reactive)
     * Updates global map state automatically
     */
    async searchNearbySpots(request: NearbySearchRequest): Promise<Spot[]> {
        try {
            mapActions.setLoading(true);
            mapActions.setError(null);

            const spots = await this.performNearbySearch(request);
            
            // Update global state
            mapActions.setSpots(spots);
            mapActions.setLoading(false);
            
            return spots;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to search nearby spots';
            mapActions.setError(errorMessage);
            mapActions.setLoading(false);
            throw error;
        }
    }

    /**
     * Perform the actual nearby search with enhanced error handling
     */
    private async performNearbySearch(request: NearbySearchRequest): Promise<Spot[]> {
        return new Promise((resolve, reject) => {
            // Enhanced search request with study-specific types
            const searchRequest: google.maps.places.PlaceSearchRequest = {
                location: request.location,
                radius: request.radius,
                keyword: request.keyword || 'study coffee library workspace',
                type: 'establishment' // More specific than default
            };

            this.service.nearbySearch(searchRequest, (results, status, pagination) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    const spots = this.convertPlacesToSpots(results);
                    
                    // Context7 pattern: Handle pagination for more results
                    if (pagination && pagination.hasNextPage && spots.length < 10) {
                        setTimeout(() => {
                            pagination.nextPage();
                        }, 2000); // Required delay for pagination
                    }
                    
                    resolve(spots);
                } else {
                    const errorMsg = this.getPlacesErrorMessage(status);
                    reject(new Error(errorMsg));
                }
            });
        });
    }

    /**
     * Get detailed information about a place with enhanced fields
     */
    async getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult | null> {
        return new Promise((resolve, reject) => {
            const request: google.maps.places.PlaceDetailsRequest = {
                placeId: placeId,
                fields: [
                    'name', 
                    'geometry', 
                    'formatted_address',
                    'photos',
                    'rating',
                    'user_ratings_total',
                    'opening_hours',
                    'place_id',
                    'types',
                    'website',
                    'formatted_phone_number',
                    'price_level',
                    'reviews',
                    'vicinity'
                ]
            };

            this.service.getDetails(request, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    resolve(place);
                } else {
                    const errorMsg = this.getPlacesErrorMessage(status);
                    reject(new Error(errorMsg));
                }
            });
        });
    }

    /**
     * Convert Google Places results to Spot objects with enhanced data
     */
    private convertPlacesToSpots(places: google.maps.places.PlaceResult[]): Spot[] {
        return places.map((place, index) => {
            const spot: Spot = {
                id: place.place_id || `place-${index}`,
                name: place.name || 'Unknown Place',
                location: place.vicinity || place.formatted_address || 'Unknown Location',
                image: this.getPlacePhoto(place),
                description: this.generateDescription(place),
                distance: 'Calculating...', // Will be calculated separately
                openStatus: this.getOpenStatus(place),
                rating: this.generateRating(place.rating || 3.5, place.user_ratings_total || 0)
            };
            return spot;
        });
    }

    /**
     * Get the best photo URL for a place
     */
    private getPlacePhoto(place: google.maps.places.PlaceResult): string {
        if (place.photos && place.photos.length > 0) {
            // Get a medium-sized photo (400px width)
            return place.photos[0].getUrl({ maxWidth: 400, maxHeight: 300 });
        }
        // Fallback to a placeholder
        return 'https://placehold.co/400x300/f0f0f0/666666?text=No+Photo';
    }

    /**
     * Determine if a place is currently open with better logic
     */
    private getOpenStatus(place: google.maps.places.PlaceResult): boolean {
        if (place.opening_hours?.isOpen) {
            try {
                const isOpen = place.opening_hours.isOpen();
                return isOpen !== undefined ? isOpen : true;
            } catch (error) {
                console.warn('Error checking opening hours:', error);
            }
        }
        
        // Fallback: assume open during typical hours (8 AM - 8 PM)
        const now = new Date();
        const hour = now.getHours();
        return hour >= 8 && hour <= 20;
    }

    /**
     * Generate enhanced rating object based on place data
     */
    private generateRating(googleRating: number, reviewCount: number): {
        overall: number;
        atmosphere: number;
        comfort: number;
        openLate: number;
        seating: number;
    } {
        // Base rating on Google rating with some variation for different categories
        const baseRating = Math.min(Math.max(googleRating, 1), 5);
        const variance = 0.3; // Small variance between categories
        
        // Use reviewCount to add slight bias (more reviews = slightly more reliable)
        const reliabilityFactor = Math.min(reviewCount / 100, 1) * 0.1;
        
        return {
            overall: baseRating,
            atmosphere: Math.min(5, Math.max(1, baseRating + (Math.random() - 0.5) * variance + reliabilityFactor)),
            comfort: Math.min(5, Math.max(1, baseRating + (Math.random() - 0.5) * variance + reliabilityFactor)),
            openLate: Math.min(5, Math.max(1, baseRating + (Math.random() - 0.5) * variance)),
            seating: Math.min(5, Math.max(1, baseRating + (Math.random() - 0.5) * variance + reliabilityFactor))
        };
    }

    /**
     * Generate a description based on place types with Context7 patterns
     */
    private generateDescription(place: google.maps.places.PlaceResult): string {
        const types = place.types || [];
        const rating = place.rating || 0;
        const reviewCount = place.user_ratings_total || 0;
        
        let description = '';
        
        if (types.includes('library')) {
            description = 'A quiet library space perfect for focused studying and research.';
        } else if (types.includes('cafe') || types.includes('coffee_shop')) {
            description = 'A cozy cafe atmosphere ideal for studying with coffee and light refreshments.';
        } else if (types.includes('university') || types.includes('school')) {
            description = 'University facility providing dedicated study spaces for students.';
        } else if (types.includes('restaurant')) {
            description = 'Restaurant with a study-friendly environment and good ambiance.';
        } else if (types.includes('book_store')) {
            description = 'Bookstore with reading areas perfect for quiet study sessions.';
        } else {
            description = 'A location suitable for studying and productive work.';
        }
        
        // Add rating context if available
        if (rating > 0 && reviewCount > 0) {
            description += ` Rated ${rating.toFixed(1)} stars by ${reviewCount} reviewers.`;
        }
        
        return description;
    }

    /**
     * Get user-friendly error messages for Places API status codes
     */
    private getPlacesErrorMessage(status: google.maps.places.PlacesServiceStatus): string {
        switch (status) {
            case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                return 'No study spots found in this area. Try expanding your search radius.';
            case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
                return 'Search limit reached. Please try again in a few moments.';
            case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
                return 'Search request denied. Please check your API key configuration.';
            case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
                return 'Invalid search request. Please try a different location.';
            case google.maps.places.PlacesServiceStatus.NOT_FOUND:
                return 'Location not found. Please try a different search area.';
            default:
                return `Places search failed with status: ${status}`;
        }
    }
}

/**
 * Initialize Places API Service with reactive state management
 * Integrates with global map state using Context7 patterns
 */
export async function initializePlacesService(map: google.maps.Map): Promise<SveltePlacesService> {
    // Ensure Google Maps API is loaded with required libraries
    if (!isGoogleMapsLoaded()) {
        await loadGoogleMapsAPI({ 
            apiKey: getApiKey(),
            libraries: ['places', 'geometry', 'marker']
        });
    }

    const service = new SveltePlacesService({ map });
    
    // Update global state
    mapActions.setPlacesService(service.getService());
    mapActions.setApiLoaded(true);
    
    return service;
}

/**
 * Calculate distance between two points using Maps API (reactive)
 * Enhanced with better formatting and error handling
 */
export function calculateDistance(
    from: google.maps.LatLng | google.maps.LatLngLiteral,
    to: google.maps.LatLng | google.maps.LatLngLiteral
): string {
    if (!window.google?.maps?.geometry) {
        console.warn('Google Maps Geometry library not loaded');
        return 'N/A';
    }

    try {
        const fromLatLng = from instanceof google.maps.LatLng ? from : new google.maps.LatLng(from.lat, from.lng);
        const toLatLng = to instanceof google.maps.LatLng ? to : new google.maps.LatLng(to.lat, to.lng);
        
        const distance = google.maps.geometry.spherical.computeDistanceBetween(fromLatLng, toLatLng);

        // Enhanced distance formatting
        if (distance < 100) {
            return `${Math.round(distance)}m`;
        } else if (distance < 1000) {
            return `${Math.round(distance / 10) * 10}m`; // Round to nearest 10m
        } else if (distance < 10000) {
            return `${(distance / 1000).toFixed(1)}km`;
        } else {
            return `${Math.round(distance / 1000)}km`;
        }
    } catch (error) {
        console.error('Error calculating distance:', error);
        return 'N/A';
    }
}

/**
 * Reactive helper to get nearby spots with automatic state updates
 * Context7 pattern for centralized state management
 */
export async function searchNearbySpots(request: NearbySearchRequest): Promise<Spot[]> {
    if (!mapState.map) {
        throw new Error('Map not initialized');
    }

    // Create a service instance for the search
    const service = new SveltePlacesService({ map: mapState.map });
    return service.searchNearbySpots(request);
} 