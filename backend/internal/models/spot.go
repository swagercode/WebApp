package models

type Rating struct {
	Overall    float64 `firestore:"overall" json:"overall"`
	Atmosphere float64 `firestore:"atmosphere" json:"atmosphere"`
	Comfort    float64 `firestore:"comfort" json:"comfort"`
	OpenLate   float64 `firestore:"openLate" json:"openLate"`
	Seating    float64 `firestore:"seating" json:"seating"`
}

type Spot struct {
	Name        string `firestore:"name" json:"name"`
	Location    string `firestore:"location" json:"location"`
	Image       string `firestore:"image" json:"image"`
	Description string `firestore:"description" json:"description"`
	Distance    string `firestore:"distance" json:"distance"`
	OpenStatus  bool   `firestore:"openStatus" json:"openStatus"`
	Rating      Rating `firestore:"rating" json:"rating"`
}
