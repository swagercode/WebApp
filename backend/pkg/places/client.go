package places

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type Client struct {
	apiKey  string
	baseURL string
}

type SearchRequest struct {
	TextQuery    string        `json:"textQuery"`
	PageSize     int           `json:"pageSize,omitempty"`
	LanguageCode string        `json:"languageCode,omitempty"`
	LocationBias *LocationBias `json:"locationBias,omitempty"`
}

type LocationBias struct {
	Circle Circle `json:"circle"`
}

type Circle struct {
	Center Location `json:"center"`
	Radius int      `json:"radius"`
}

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Place struct {
	ID               string               `json:"id"`
	DisplayName      *DisplayName         `json:"displayName,omitempty"`
	FormattedAddress string               `json:"formattedAddress,omitempty"`
	Location         *Location            `json:"location,omitempty"`
	Rating           float64              `json:"rating,omitempty"`
	UserRatingCount  int                  `json:"userRatingCount,omitempty"`
	PriceLevel       string               `json:"priceLevel,omitempty"`
	PrimaryType      string               `json:"primaryType,omitempty"`
	Photos           []Photo              `json:"photos,omitempty"`
	OpeningHours     *RegularOpeningHours `json:"regularOpeningHours,omitempty"`
	PhoneNumber      string               `json:"phoneNumber,omitempty"`
	WebsiteURI       string               `json:"websiteUri,omitempty"`
	Reviews          []Review             `json:"reviews,omitempty"`
}

type DisplayName struct {
	Text         string `json:"text"`
	LanguageCode string `json:"languageCode,omitempty"`
}

type Photo struct {
	Name              string              `json:"name"`
	WidthPx           int                 `json:"widthPx"`
	HeightPx          int                 `json:"heightPx"`
	AuthorAttribution []AuthorAttribution `json:"authorAttributions,omitempty"`
}

type AuthorAttribution struct {
	DisplayName string `json:"displayName"`
	URI         string `json:"uri,omitempty"`
	PhotoURI    string `json:"photoUri,omitempty"`
}

type RegularOpeningHours struct {
	OpenNow             bool     `json:"openNow"`
	WeekdayDescriptions []string `json:"weekdayDescriptions,omitempty"`
}

type Review struct {
	Name                           string             `json:"name"`
	RelativePublishTimeDescription string             `json:"relativePublishTimeDescription,omitempty"`
	Rating                         int                `json:"rating"`
	Text                           *ReviewText        `json:"text,omitempty"`
	AuthorAttribution              *AuthorAttribution `json:"authorAttribution,omitempty"`
	PublishTime                    string             `json:"publishTime,omitempty"`
}

type ReviewText struct {
	Text         string `json:"text"`
	LanguageCode string `json:"languageCode,omitempty"`
}

type SearchResponse struct {
	Places []Place `json:"places"`
}

func NewClient(apiKey string) *Client {
	return &Client{
		apiKey:  apiKey,
		baseURL: "https://places.googleapis.com/v1/places",
	}
}

func (c *Client) SearchText(req SearchRequest) (*SearchResponse, error) {
	if c.apiKey == "" {
		return nil, fmt.Errorf("Google Places API key is required")
	}

	// Set defaults
	if req.PageSize == 0 {
		req.PageSize = 10
	}
	if req.LanguageCode == "" {
		req.LanguageCode = "en"
	}

	reqBody, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	httpReq, err := http.NewRequest("POST", c.baseURL+":searchText", strings.NewReader(string(reqBody)))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("Content-Type", "application/json")
	httpReq.Header.Set("X-Goog-Api-Key", c.apiKey)
	httpReq.Header.Set("X-Goog-FieldMask", "places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.photos,places.regularOpeningHours")

	client := &http.Client{}
	resp, err := client.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Places API error: %d %s", resp.StatusCode, resp.Status)
	}

	var searchResp SearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&searchResp); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &searchResp, nil
}

func (c *Client) GetPlaceDetails(placeID string) (*Place, error) {
	if c.apiKey == "" {
		return nil, fmt.Errorf("Google Places API key is required")
	}

	httpReq, err := http.NewRequest("GET", c.baseURL+"/"+placeID, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	httpReq.Header.Set("X-Goog-Api-Key", c.apiKey)
	httpReq.Header.Set("X-Goog-FieldMask", "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,primaryType,photos,regularOpeningHours,phoneNumber,websiteUri,reviews")

	client := &http.Client{}
	resp, err := client.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, nil
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Place Details API error: %d %s", resp.StatusCode, resp.Status)
	}

	var place Place
	if err := json.NewDecoder(resp.Body).Decode(&place); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &place, nil
}

// GetStudyPlaceTypes returns place types that are good for studying
func GetStudyPlaceTypes() []string {
	return []string{
		"library",
		"cafe",
		"book_store",
		"university",
		"school",
		"bakery",
		"restaurant",
		"meal_takeaway",
		"lodging",
	}
}
