package sqlrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
)

type SpotRepository struct {
	db *sql.DB
}

func NewSpotRepository(db *sql.DB) *SpotRepository {
	return &SpotRepository{db: db}
}

func (r *SpotRepository) GetAllSpots(ctx context.Context) ([]models.Spot, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT name, location, image, description, distance, open_status, overall, atmosphere, comfort, open_late, seating FROM spots`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var spots []models.Spot
	for rows.Next() {
		var spot models.Spot
		var rating models.Rating
		var openStatus bool
		if err := rows.Scan(&spot.Name, &spot.Location, &spot.Image, &spot.Description, &spot.Distance, &openStatus, &rating.Overall, &rating.Atmosphere, &rating.Comfort, &rating.OpenLate, &rating.Seating); err != nil {
			return nil, err
		}
		spot.OpenStatus = openStatus
		spot.Rating = rating
		spots = append(spots, spot)
	}
	return spots, nil
}
