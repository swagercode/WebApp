<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import type { Spot } from '../../../components/types';
    import SpotImageGallery from '../../../components/spots/SpotImageGallery.svelte';
    import SpotInfo from '../../../components/spots/SpotInfo.svelte';
    import SpotRatings from '../../../components/spots/SpotRatings.svelte';
    import SpotFeatures from '../../../components/spots/SpotFeatures.svelte';
    import SpotsMap from '../../../components/maps/SpotsMap.svelte';
    import SpotReviews from '../../../components/spots/SpotReviews.svelte';
    
    const spotId = $derived(page.params.id);
    
    const spotsDatabase: Record<string, Spot> = {
        "darkhorse-cafe": {
            id: "darkhorse-cafe",
            name: "DarkHorse Cafe",
            location: "123 Main St, College Town",
            image: "https://placehold.co/600x400",
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: {
                overall: 4.5,
                atmosphere: 4.2,
                comfort: 4.8,
                quiet: 3.5,
                seating: 4.6
            }
        },
        "study-lounge": {
            id: "study-lounge",
            name: "University Study Lounge",
            location: "456 Campus Dr, College Town",
            image: "https://placehold.co/600x400/0066CC/FFFFFF",
            description: "Quiet study space with comfortable seating and great lighting.",
            distance: "3 minute walk",
            openStatus: false,
            rating: {
                overall: 4.2,
                atmosphere: 3.8,
                comfort: 4.5,
                quiet: 4.8,
                seating: 4.0
            }
        },
        "central-library": {
            id: "central-library",
            name: "Central Library",
            location: "789 Library Ave, College Town",
            image: "https://placehold.co/600x400/CC6600/FFFFFF",
            description: "Traditional library setting with extensive resources and quiet areas.",
            distance: "7 minute walk",
            openStatus: true,
            rating: {
                overall: 4.7,
                atmosphere: 4.1,
                comfort: 4.3,
                quiet: 3.2,
                seating: 4.9
            }
        }
    };
    
    // Get the current spot based on the URL parameter
    const spot = $derived(spotsDatabase[spotId] || spotsDatabase["darkhorse-cafe"]);
    
    let isFavorited = $state(false);
    
    // Mock data for additional images
    let images = [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400/0066CC/FFFFFF",
        "https://placehold.co/600x400/CC6600/FFFFFF",
        "https://placehold.co/600x400/009966/FFFFFF"
    ];
    
    // Mock reviews data
    let reviews = [
        {
            id: 1,
            userName: "Sarah M.",
            userAvatar: "https://placehold.co/40x40",
            date: "2 weeks ago",
            rating: {
                overall: 5,
                atmosphere: 5,
                comfort: 4,
                quiet: 3,
                seating: 5
            },
            text: "Perfect spot for studying! Great atmosphere and comfortable seating. The coffee is excellent too."
        },
        {
            id: 2,
            userName: "Mike R.",
            userAvatar: "https://placehold.co/40x40",
            date: "1 month ago",
            rating: {
                overall: 4,
                atmosphere: 4,
                comfort: 5,
                quiet: 4,
                seating: 4
            },
            text: "Love coming here during finals week. Quiet enough to focus but still has good energy."
        }
    ];
    
    // Things to know features
    let features = [
        { name: "Air Conditioned", icon: "❄️", available: true },
        { name: "WiFi (free)", icon: "📶", available: true },
        { name: "Requires purchase", icon: "☕", available: true },
        { name: "Wheelchair accessible", icon: "♿", available: true },
        { name: "Has restroom", icon: "🚻", available: true },
        { name: "Outdoor seating", icon: "🌳", available: false }
    ];
    
    let hours = "7:00 am - 10:00 pm";
    
    function toggleFavorite() {
        isFavorited = !isFavorited;
    }
    
    onMount(() => {
        console.log(`Loading spot with ID: ${spotId}`);
    });
</script>

<svelte:head>
    <title>{spot.name} - StudySpot</title>
</svelte:head>

<main class="spot-page">
    <header class="spot-header">
        <button class="back-btn" onclick={() => history.back()}>
            ← Back
        </button>
        <button class="favorite-btn" onclick={toggleFavorite} class:favorited={isFavorited}>
            {isFavorited ? '❤️' : '🤍'}
        </button>
    </header>
    
    <SpotImageGallery {images} spotName={spot.name} />
    <SpotInfo {spot} {reviews} {hours} />
    <SpotRatings rating={spot.rating} />
    <SpotFeatures {features} />
    <SpotReviews {reviews} />
</main>

<style>

    :global(:root) {
        font-family: 'Gotham';
        --font-clr: #7A7A7A;
        --font-weight: 550;

        --primary-clr: #EF934B;
        --brighter-primary-clr: #ff903c;
        --faded-primary-clr: #edd3be;
        --hover-clr: #F5F5F5;
        --open-clr: #628F66;
        --closed-clr: #C60000;
        --gray-button-clr: #F2F2F2;
        --gray-button-hover-clr: #EBEBEB;

        --rating-clr: #F0C0A2;

        --bg-clr: #ffffff;

        --carousel-width: 100%;
        --carousel-height: 100%;
        --carousel-border: 1px solid black;

        --button-size: 3rem;

        --box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

        margin: 0;
        padding: 0;

    }

    .spot-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
        font-family: 'Gotham', sans-serif;
    }
    
    .spot-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .back-btn, .favorite-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .back-btn:hover, .favorite-btn:hover {
        background-color: var(--hover-clr, #f5f5f5);
    }
    
    .favorite-btn.favorited {
        color: red;
    }

    @media (max-width: 768px) {
        .spot-page {
            padding: 0.5rem;
        }

    }
</style> 