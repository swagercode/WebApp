<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
	import SpotImageGallery from "../../../components/spots/SpotImageGallery.svelte";
    import type { Rating } from "../../../components/types";

    let spot = $state({
        name: "Spot Name",
        images: [],
        description: "Spot Description",
        location: "Spot Location",
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
        <h1>{spot.name}</h1>
    </div>

    <div class="image-gallery-wrapper">
        <SpotImageGallery images={spot.images} spotName={spot.name} />
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

    .title-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
