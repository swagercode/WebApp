package services

import (
	"backend/pkg/places"
	"context"
)

type PlacesService struct {
	client *places.Client
}

func NewPlacesService(client *places.Client) *PlacesService {
	return &PlacesService{
		client: client,
	}
}

func (s *PlacesService) SearchPlaces(ctx context.Context, query string, lat, lng float64, radius int) (*places.SearchResponse, error) {
	req := places.SearchRequest{
		TextQuery:    query,
		PageSize:     20,
		LanguageCode: "en",
	}

	// Add location bias if coordinates are provided
	if lat != 0 && lng != 0 {
		req.LocationBias = &places.LocationBias{
			Circle: places.Circle{
				Center: places.Location{
					Latitude:  lat,
					Longitude: lng,
				},
				Radius: radius,
			},
		}
	}

	return s.client.SearchText(req)
}

func (s *PlacesService) GetPlaceDetails(ctx context.Context, placeID string) (*places.Place, error) {
	return s.client.GetPlaceDetails(placeID)
}

func (s *PlacesService) SearchStudySpots(ctx context.Context, lat, lng float64, radius int) (*places.SearchResponse, error) {
	// Search for study-friendly places
	req := places.SearchRequest{
		TextQuery:    "study spots cafes libraries",
		PageSize:     20,
		LanguageCode: "en",
	}

	// Add location bias if coordinates are provided
	if lat != 0 && lng != 0 {
		req.LocationBias = &places.LocationBias{
			Circle: places.Circle{
				Center: places.Location{
					Latitude:  lat,
					Longitude: lng,
				},
				Radius: radius,
			},
		}
	}

	return s.client.SearchText(req)
}
