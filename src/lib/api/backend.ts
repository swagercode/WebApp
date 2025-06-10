// Backend API client for places and spots
import { browser } from '$app/environment';

const API_BASE_URL = browser 
    ? (import.meta.env.VITE_API_URL || 'http://localhost:8080')
    : 'http://localhost:8080';

export interface BackendPlace {
    id: string;
    displayName?: {
        text: string;
        languageCode?: string;
    };
    formattedAddress?: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    rating?: number;
    userRatingCount?: number;
    priceLevel?: string;
    primaryType?: string;
    photos?: Array<{
        name: string;
        widthPx: number;
        heightPx: number;
        authorAttributions?: Array<{
            displayName: string;
            uri?: string;
            photoUri?: string;
        }>;
    }>;
    regularOpeningHours?: {
        openNow: boolean;
        weekdayDescriptions?: string[];
    };
    phoneNumber?: string;
    websiteUri?: string;
    reviews?: Array<{
        name: string;
        relativePublishTimeDescription?: string;
        rating: number;
        text?: {
            text: string;
            languageCode?: string;
        };
        authorAttribution?: {
            displayName: string;
            uri?: string;
            photoUri?: string;
        };
        publishTime?: string;
    }>;
}

export interface SearchResponse {
    places: BackendPlace[];
}

class BackendAPI {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Search for places using text query
     */
    async searchPlaces(
        query: string, 
        lat?: number, 
        lng?: number, 
        radius: number = 5000
    ): Promise<SearchResponse> {
        const params = new URLSearchParams({ q: query });
        
        if (lat !== undefined && lng !== undefined) {
            params.append('lat', lat.toString());
            params.append('lng', lng.toString());
        }
        
        if (radius !== 5000) {
            params.append('radius', radius.toString());
        }

        const response = await fetch(`${this.baseUrl}/api/places/search?${params}`);
        
        if (!response.ok) {
            throw new Error(`Search failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Search for study-friendly places nearby
     */
    async searchStudySpots(
        lat?: number, 
        lng?: number, 
        radius: number = 5000
    ): Promise<SearchResponse> {
        const params = new URLSearchParams();
        
        if (lat !== undefined && lng !== undefined) {
            params.append('lat', lat.toString());
            params.append('lng', lng.toString());
        }
        
        if (radius !== 5000) {
            params.append('radius', radius.toString());
        }

        const response = await fetch(`${this.baseUrl}/api/places/study-spots?${params}`);
        
        if (!response.ok) {
            throw new Error(`Study spots search failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Get detailed information about a place
     */
    async getPlaceDetails(placeId: string): Promise<BackendPlace | null> {
        const response = await fetch(`${this.baseUrl}/api/places/details/${encodeURIComponent(placeId)}`);
        
        if (response.status === 404) {
            return null;
        }
        
        if (!response.ok) {
            throw new Error(`Place details failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Get all spots (existing endpoint)
     */
    async getAllSpots(): Promise<unknown[]> {
        const response = await fetch(`${this.baseUrl}/spots`);
        
        if (!response.ok) {
            throw new Error(`Get spots failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Export singleton instance
export const backendAPI = new BackendAPI();

// Utility functions
export function formatPriceLevel(priceLevel: string): string {
    const levels: Record<string, string> = {
        "PRICE_LEVEL_FREE": "Free",
        "PRICE_LEVEL_INEXPENSIVE": "$",
        "PRICE_LEVEL_MODERATE": "$$", 
        "PRICE_LEVEL_EXPENSIVE": "$$$",
        "PRICE_LEVEL_VERY_EXPENSIVE": "$$$$"
    };
    return levels[priceLevel] || "";
}

export function formatOpeningHours(openingHours?: BackendPlace['regularOpeningHours']): string {
    if (!openingHours?.weekdayDescriptions) {
        return "Hours not available";
    }
    return openingHours.weekdayDescriptions.join(", ");
}

export function isPlaceOpen(openingHours?: BackendPlace['regularOpeningHours']): boolean | null {
    if (!openingHours) {
        return null;
    }
    return openingHours.openNow;
} 