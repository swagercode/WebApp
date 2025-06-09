<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
    import type { Rating } from "../../../components/types";

    let spot = $state({
        name: "Muri Cafe",
        images: [],
        description: "Spot Description",
        location: "North Park",
        rating: {
            overall: 5,
            atmosphere: 5,
            comfort: 5,
            quiet: 5,
            seating: 5,
        } as Rating
    });

</script>


<div class="main-wrapper">
    <div class="title-wrapper">
        <h1 class="title">{spot.name} located in {spot.location}!</h1>
    </div>

    <div class="image-gallery-wrapper">
    </div>

    <div class="map-wrapper">
        <SpotsMap />
    </div>
</div>

<style> 
    .main-wrapper {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 2rem;
        font-weight: 600;
        text-align: left;
    }

    .title-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .image-gallery-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .map-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
