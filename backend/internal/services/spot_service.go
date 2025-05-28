package services

import (
	"backend/internal/models"
	"backend/internal/repository/firestore"
	"context"
)

type SpotService struct {
	repo *firestore.SpotRepository
}

func NewSpotService(repo *firestore.SpotRepository) *SpotService {
	return &SpotService{repo: repo}
}

func (s *SpotService) GetAllSpots(ctx context.Context) ([]models.Spot, error) {
	return s.repo.GetAllSpots(ctx)
}
