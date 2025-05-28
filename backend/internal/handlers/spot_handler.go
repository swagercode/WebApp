package handlers

import (
	"backend/internal/services"
	"context"
	"encoding/json"
	"net/http"
)

type SpotHandler struct {
	Service *services.SpotService
}

func NewSpotHandler(service *services.SpotService) *SpotHandler {
	return &SpotHandler{Service: service}
}

func (h *SpotHandler) GetAllSpots(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	spots, err := h.Service.GetAllSpots(ctx)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(spots)
}
