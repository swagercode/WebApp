
<script lang="ts">
    import { onMount, getContext } from "svelte";
    import { currentCategory } from "../../lib/index.svelte";

    let { spot } = $props();

    function getCurrCategory() {
        switch (currentCategory.name) {
            case "overall" :
                return String(spot.rating.overall);
            case "atmosphere" :
                return String(spot.rating.atmosphere);
            case "comfort" :
                return String(spot.rating.comfort);
            case "open-late" :
                return String(spot.rating.openLate);
            case "seating" :
                return String(spot.rating.seating);
        }
    }

    onMount(() => {
        console.log("Spot mounted");
    });
</script>
<div class="spot">
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
    </div>
</div>

<style>
    .spot {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
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
    }

    .spot-name {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .spot-name span {
        display: inline-block;
        font-size: 1.5rem;
        font-weight: 600;
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
