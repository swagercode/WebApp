<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
    import SpotImageGallery from "../../../components/spots/spotPage/SpotImageGallery.svelte";
    import FractionalStarReviews from "../../../components/spots/spotPage/FractionalStarReviews.svelte";
    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();
    
    let spot = $state(data.spot);

    const placeholderImages = [
        "https://picsum.photos/1000?random=1",
        "https://picsum.photos/300/200?random=2",
        "https://picsum.photos/1000/250?random=3",
        "https://picsum.photos/700/400?random=4",
        "https://picsum.photos/200/200?random=5"
    ];
</script>


<div class="main-wrapper">
    <div class="title-wrapper">
        <h1 class="title">{spot.name} located in {spot.location}!</h1>
    </div>

    <div class="image-gallery-wrapper">
        <SpotImageGallery images={placeholderImages} />
    </div>

    <div class="rating-wrapper">
        <FractionalStarReviews rating={spot.rating} />
    </div>

</div>

<style> 
    .main-wrapper {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
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
        height: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

</style>
