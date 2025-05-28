package main

import (
	"backend/internal/handlers"
	"backend/internal/repository/firestore"
	sqlrepo "backend/internal/repository/sql"
	"backend/internal/services"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	cfirestore "cloud.google.com/go/firestore"
	_ "github.com/lib/pq"
)

func healthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Health Check: OK")
}

func main() {
	ctx := context.Background()

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

		http.HandleFunc("/health", healthCheck)
		http.HandleFunc("/spots", func(w http.ResponseWriter, r *http.Request) {
			spots, err := repo.GetAllSpots(r.Context())
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("Error fetching spots"))
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(spots)
		})

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

	http.HandleFunc("/health", healthCheck)
	http.HandleFunc("/spots", handler.GetAllSpots)

	log.Println("Server starting on :8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
