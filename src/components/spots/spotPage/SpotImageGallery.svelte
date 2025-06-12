<script lang="ts">
    import SpotImageSquareCollage from "./SpotImageSquareCollage.svelte";

    let { images } = $props();
</script>

<div class="image-gallery">
    <figure class="main-image">
        <img src={images[0]} alt="spot" />
    </figure>
    <figure class="gallery-container">
        <SpotImageSquareCollage images={images.slice(1)} />
    </figure>
</div>

<style>
    .image-gallery {
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
    }

    .main-image {
        width: 100%;
        height: 100%;
    }

    .main-image > img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 1rem;
    }

    .gallery-container {
        width: 100%;
        height: 100%;
    }
</style>