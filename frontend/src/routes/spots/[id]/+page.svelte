<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
    import type { Rating } from "../../../components/types";
    import SpotImageGallery from "../../../components/spots/spotPage/SpotImageGallery.svelte";

    let spot = $state({
        name: "Muri Cafe",
        images: ["https://s3-media0.fl.yelpcdn.com/bphoto/djSccIFUKU2n9aqCzGm2FA/348s.jpg", "https://img1.wsimg.com/isteam/ip/cefd2c51-c7ba-45bc-b26a-407487dfdc42/IMG_9377%20copy.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQNgyVDUeon7uUzTBdLsUcRYaNZdu3rEOdQ&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVRF51uz1QppZfDWUvKrCPxQDrKZdYcLnV-g&s"],
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
