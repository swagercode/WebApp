<script lang="ts">
    import { goto } from '$app/navigation';
    import { currentCategory } from "../../../lib/index.svelte";

    let { spot } = $props();

    function getCurrCategory() {
        switch (currentCategory.name) {
            case "overall":
                return String(spot.rating.overall);
            case "atmosphere":
                return String(spot.rating.atmosphere);
            case "comfort":
                return String(spot.rating.comfort);
            case "open-late":
                return String(spot.rating.openLate);
            case "seating":
                return String(spot.rating.seating);
            default:
                return String(spot.rating.overall);
        }
    }

    function navigateToSpot() {
        goto(`/spots/${spot.id}`);
    }

</script>

<button class="spot" onclick={navigateToSpot}>
    <div class="spot-image">
        <img src={spot.images[0]} alt="spot" aria-label={spot.name}/>
    </div>
    <div class="spot-info">
        <div class="spot-top-info">
            <span class="spot-name-text">{spot.name}</span>
            <span class="spot-category">{getCurrCategory()}<span class="spot-category-star">★</span></span>
        </div>
        <p class="spot-distance">{spot.distance}</p>
        <p class="spot-open-status" style={spot.openStatus ? "color: var(--open-clr)" : "color: var(--closed-clr)"}>{spot.openStatus ? "Open now" : "Closed"}</p>
    </div>
</button>

<style>
    .spot {       
        width: 100%;        
        height: 100%;        
        display: flex;        
        flex-direction: column;        
        cursor: pointer;        
        border: none;        
        background: transparent;        
        padding: 0;        
        text-align: left;  
    }

    .spot:hover {
        transform: translateY(-2px);
    }

    .spot-image {
        aspect-ratio: 1/1;
    }

    .spot-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
        aspect-ratio: 1/1;
        width: 100%;
    }

    .spot-info {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        margin-top: 0.5rem;
    }

    .spot-top-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--font-clr-dark) !important;
        margin: 0;
        padding: 0;
    }

    .spot-name-text {
        font-size: 1.5rem;
        font-weight: 300;
        margin: 0;
        padding: 0;
        text-align: left;
        color: var(--font-clr-dark) !important;
    }

    .spot-distance {
        font-size: 1rem;
        font-weight: 100;
        color: var(--font-clr);
        margin: 0;
        padding: 0;
    }

    .spot-open-status {
        font-size: 1rem;
        font-weight: 100;
        margin: 0;
        padding: 0;
    }

    .spot-category {
        display: inline-block;
        text-align: right;
    }

    .spot-category-star {
        font-size: 1.5rem;
        color: var(--rating-clr);
        display: inline-block;
        text-align: right;
    }
</style>

