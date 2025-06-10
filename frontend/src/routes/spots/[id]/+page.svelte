<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
    import type { Rating } from "../../../components/types";
    import SpotImageGallery from "../../../components/spots/spotPage/SpotImageGallery.svelte";
    import type { PageData } from './$types';

    // Receive the server-loaded data using Svelte 5 runes
    const { data }: { data: PageData } = $props();
    
    // Use reactive state with server-loaded data
    let spot = $state(data.spot);
</script>


<div class="main-wrapper">
    <div class="title-wrapper">
        <h1 class="title">{spot.name} located in {spot.location}!</h1>
    </div>

    <div class="image-gallery-wrapper">
        <SpotImageGallery images={spot.images} />
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
        padding-block-start: 1rem;
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
