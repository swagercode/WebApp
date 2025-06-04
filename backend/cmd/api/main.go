package main

import (
	"backend/internal/handlers"
	"backend/internal/repository/firestore"
	sqlrepo "backend/internal/repository/sql"
	"backend/internal/services"
	"backend/pkg/places"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	cfirestore "cloud.google.com/go/firestore"
	_ "github.com/lib/pq"
)

func healthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Health Check: OK")
}

// enableCORS adds CORS headers to allow frontend to make requests
func enableCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

// corsMiddleware wraps handlers with CORS support
func corsMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w, r)
		if r.Method == "OPTIONS" {
			return
		}
		handler(w, r)
	}
}

func main() {
	ctx := context.Background()

	// Get Google Places API key
	placesAPIKey := os.Getenv("GOOGLE_PLACES_API_KEY")
	if placesAPIKey == "" {
		log.Println("Warning: GOOGLE_PLACES_API_KEY not set. Places API functionality will be disabled.")
	}

	// Initialize Places client and service
	var placesHandler *handlers.PlacesHandler
	if placesAPIKey != "" {
		placesClient := places.NewClient(placesAPIKey)
		placesService := services.NewPlacesService(placesClient)
		placesHandler = handlers.NewPlacesHandler(placesService)
	}

	usePostgres := os.Getenv("USE_POSTGRES") == "true"

	if usePostgres {
		dbURL := os.Getenv("POSTGRES_DSN")
		db, err := sql.Open("postgres", dbURL)
		if err != nil {
			log.Fatalf("Failed to connect to Postgres: %v", err)
		}
		defer db.Close()

		repo := sqlrepo.NewSpotRepository(db)
		// TODO: Add user repo, services, handlers as needed

		// Register routes
		http.HandleFunc("/health", corsMiddleware(healthCheck))
		http.HandleFunc("/spots", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
			spots, err := repo.GetAllSpots(r.Context())
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("Error fetching spots"))
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(spots)
		}))

		// Places API routes
		if placesHandler != nil {
			http.HandleFunc("/api/places/search", corsMiddleware(placesHandler.SearchPlaces))
			http.HandleFunc("/api/places/study-spots", corsMiddleware(placesHandler.SearchStudySpots))
			// Handle place details with ID in path
			http.HandleFunc("/api/places/details/", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
				if !strings.HasPrefix(r.URL.Path, "/api/places/details/") {
					http.Error(w, "Not found", http.StatusNotFound)
					return
				}
				placesHandler.GetPlaceDetails(w, r)
			}))
		}

		log.Println("Server starting on :8080 with Postgres...")
		log.Fatal(http.ListenAndServe(":8080", nil))
		return
	}

	// TODO: Set GOOGLE_APPLICATION_CREDENTIALS env var or use credentials from .env
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	client, err := cfirestore.NewClient(ctx, projectID)
	if err != nil {
		log.Fatalf("Failed to create Firestore client: %v", err)
	}
	defer client.Close()

	repo := firestore.NewSpotRepository(client)
	service := services.NewSpotService(repo)
	handler := handlers.NewSpotHandler(service)

	// Register routes
	http.HandleFunc("/health", corsMiddleware(healthCheck))
	http.HandleFunc("/spots", corsMiddleware(handler.GetAllSpots))

	// Places API routes
	if placesHandler != nil {
		http.HandleFunc("/api/places/search", corsMiddleware(placesHandler.SearchPlaces))
		http.HandleFunc("/api/places/study-spots", corsMiddleware(placesHandler.SearchStudySpots))
		// Handle place details with ID in path
		http.HandleFunc("/api/places/details/", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
			if !strings.HasPrefix(r.URL.Path, "/api/places/details/") {
				http.Error(w, "Not found", http.StatusNotFound)
				return
			}
			placesHandler.GetPlaceDetails(w, r)
		}))
		log.Println("Places API endpoints registered")
	}

	log.Println("Server starting on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
