<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { currentCategory } from "../../lib/index.svelte";

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
        // Navigate to the individual spot page using the spot's ID
        goto(`/spots/${spot.id}`);
    }

    onMount(() => {
        console.log("Spot mounted");
    });
</script>

<button class="spot" onclick={navigateToSpot}>
    <div class="spot-image">
        <img src={spot.image} alt="spot" aria-label={spot.name}/>
    </div>
    <div class="spot-info">
        <h2 class="spot-name">
            <span>{spot.name}</span>
            <span>{getCurrCategory()}<span>★</span></span>
        </h2>
        <p class="spot-distance">{spot.distance}</p>
        <p class="spot-open-status" style={spot.openStatus ? "color: var(--open-clr)" : "color: var(--closed-clr)"}>{spot.openStatus ? "Open now" : "Closed"}</p>
        </div></button>

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
    }

    .spot-info {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        margin-top: 0.5rem;
    }

    .spot-name {
        font-size: 1.5rem;
        font-weight: 300;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .spot-name span {
        display: inline-block;
        font-size: 1.5rem;
        font-weight: 300;
        margin: 0;
        padding: 0;
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

    span > span {
        font-size: 5rem;
        color: var(--rating-clr);
    }
</style>

