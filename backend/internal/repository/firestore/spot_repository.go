package firestore

import (
	"backend/internal/models"
	"context"

	"cloud.google.com/go/firestore"
)

type SpotRepository struct {
	client *firestore.Client
}

func NewSpotRepository(client *firestore.Client) *SpotRepository {
	return &SpotRepository{client: client}
}

func (r *SpotRepository) GetAllSpots(ctx context.Context) ([]models.Spot, error) {
	var spots []models.Spot
	docs, err := r.client.Collection("spots").Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}
	for _, doc := range docs {
		var spot models.Spot
		if err := doc.DataTo(&spot); err != nil {
			return nil, err
		}
		spots = append(spots, spot)
	}
	return spots, nil
}
