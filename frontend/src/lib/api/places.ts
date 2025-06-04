// DEPRECATED: This file is deprecated in favor of backend.ts
// The Google Places API calls have been moved to the Go backend for better security and rate limiting.
// Use the backendAPI from './backend.ts' instead.
//
// This file will be removed in a future version.

// Google Places API (New) utility functions
export interface PlaceSearchRequest {
    textQuery: string;
    pageSize?: number;
    languageCode?: string;
    locationBias?: {
        circle: {
            center: {
                latitude: number;
                longitude: number;
            };
            radius: number;
        };
    };
}

export interface Place {
    id: string;
    displayName?: {
        text: string;
        languageCode: string;
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
        authorAttributions: Array<{
            displayName: string;
            uri: string;
            photoUri: string;
        }>;
    }>;
    regularOpeningHours?: {
        openNow: boolean;
        periods: Array<{
            open: {
                day: number;
                hour: number;
                minute: number;
            };
            close: {
                day: number;
                hour: number;
                minute: number;
            };
        }>;
        weekdayDescriptions: string[];
    };
    phoneNumber?: string;
    websiteUri?: string;
    reviews?: Array<{
        name: string;
        relativePublishTimeDescription: string;
        rating: number;
        text?: {
            text: string;
            languageCode: string;
        };
        originalText?: {
            text: string;
            languageCode: string;
        };
        authorAttribution?: {
            displayName: string;
            uri: string;
            photoUri: string;
        };
        publishTime: string;
    }>;
}

export class PlacesAPI {
    private apiKey: string;
    private baseUrl = "https://places.googleapis.com/v1/places";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Search for places using text query
     */
    async searchText(request: PlaceSearchRequest): Promise<Place[]> {
        if (!this.apiKey) {
            throw new Error("Google Places API key is required");
        }

        const response = await fetch(`${this.baseUrl}:searchText`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": this.apiKey,
                "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.photos,places.regularOpeningHours"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Places API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.places || [];
    }

    /**
     * Get detailed information about a place
     */
    async getPlaceDetails(placeId: string): Promise<Place | null> {
        if (!this.apiKey) {
            throw new Error("Google Places API key is required");
        }

        const response = await fetch(`${this.baseUrl}/${placeId}`, {
            headers: {
                "X-Goog-Api-Key": this.apiKey,
                "X-Goog-FieldMask": "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,primaryType,photos,regularOpeningHours,phoneNumber,websiteUri,reviews"
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Place Details API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Search for nearby places
     */
    async searchNearby(
        center: { latitude: number; longitude: number },
        radius: number,
        includedTypes: string[] = [],
        pageSize: number = 10
    ): Promise<Place[]> {
        if (!this.apiKey) {
            throw new Error("Google Places API key is required");
        }

        const requestBody = {
            includedTypes,
            maxResultCount: pageSize,
            locationRestriction: {
                circle: {
                    center,
                    radius
                }
            }
        };

        const response = await fetch(`${this.baseUrl}:searchNearby`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": this.apiKey,
                "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.photos,places.regularOpeningHours"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Nearby Search API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.places || [];
    }
}

/**
 * Format price level for display
 */
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

/**
 * Format opening hours for display
 */
export function formatOpeningHours(openingHours: Place['regularOpeningHours']): string {
    if (!openingHours?.weekdayDescriptions) return "Hours not available";
    return openingHours.weekdayDescriptions.join(", ");
}

/**
 * Check if a place is currently open
 */
export function isPlaceOpen(openingHours: Place['regularOpeningHours']): boolean | null {
    if (!openingHours) return null;
    return openingHours.openNow ?? null;
}

/**
 * Get study-friendly place types for filtering
 */
export function getStudyPlaceTypes(): string[] {
    return [
        "cafe",
        "library", 
        "university",
        "school",
        "book_store",
        "restaurant",
        "bakery",
        "coffee_shop"
    ];
} 