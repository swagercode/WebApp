package handlers

import (
	"backend/internal/services"
	"context"
	"encoding/json"
	"net/http"
	"strconv"
)

type PlacesHandler struct {
	Service *services.PlacesService
}

func NewPlacesHandler(service *services.PlacesService) *PlacesHandler {
	return &PlacesHandler{Service: service}
}

// SearchPlaces handles place search requests
// GET /api/places/search?q=query&lat=40.7128&lng=-74.0060&radius=5000
func (h *PlacesHandler) SearchPlaces(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Parse query parameters
	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	// Parse optional location parameters
	var lat, lng float64
	var radius int = 5000 // Default 5km radius

	if latStr := r.URL.Query().Get("lat"); latStr != "" {
		var err error
		lat, err = strconv.ParseFloat(latStr, 64)
		if err != nil {
			http.Error(w, "invalid latitude", http.StatusBadRequest)
			return
		}
	}

	if lngStr := r.URL.Query().Get("lng"); lngStr != "" {
		var err error
		lng, err = strconv.ParseFloat(lngStr, 64)
		if err != nil {
			http.Error(w, "invalid longitude", http.StatusBadRequest)
			return
		}
	}

	if radiusStr := r.URL.Query().Get("radius"); radiusStr != "" {
		var err error
		radius, err = strconv.Atoi(radiusStr)
		if err != nil {
			http.Error(w, "invalid radius", http.StatusBadRequest)
			return
		}
	}

	// Search places
	results, err := h.Service.SearchPlaces(ctx, query, lat, lng, radius)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

// GetPlaceDetails handles requests for detailed place information
// GET /api/places/details/{placeId}
func (h *PlacesHandler) GetPlaceDetails(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Extract place ID from URL path
	placeID := r.URL.Path[len("/api/places/details/"):]
	if placeID == "" {
		http.Error(w, "place ID is required", http.StatusBadRequest)
		return
	}

	// Get place details
	place, err := h.Service.GetPlaceDetails(ctx, placeID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	if place == nil {
		http.Error(w, "place not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(place)
}

// SearchStudySpots handles requests for study-friendly places nearby
// GET /api/places/study-spots?lat=40.7128&lng=-74.0060&radius=5000
func (h *PlacesHandler) SearchStudySpots(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Parse location parameters
	var lat, lng float64
	var radius int = 5000 // Default 5km radius

	if latStr := r.URL.Query().Get("lat"); latStr != "" {
		var err error
		lat, err = strconv.ParseFloat(latStr, 64)
		if err != nil {
			http.Error(w, "invalid latitude", http.StatusBadRequest)
			return
		}
	}

	if lngStr := r.URL.Query().Get("lng"); lngStr != "" {
		var err error
		lng, err = strconv.ParseFloat(lngStr, 64)
		if err != nil {
			http.Error(w, "invalid longitude", http.StatusBadRequest)
			return
		}
	}

	if radiusStr := r.URL.Query().Get("radius"); radiusStr != "" {
		var err error
		radius, err = strconv.Atoi(radiusStr)
		if err != nil {
			http.Error(w, "invalid radius", http.StatusBadRequest)
			return
		}
	}

	// Search study spots
	results, err := h.Service.SearchStudySpots(ctx, lat, lng, radius)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}
