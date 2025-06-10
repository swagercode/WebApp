<script lang="ts">
    let { images } = $props();
</script>

<div class="image-gallery">
    <figure class="main-image">
        <img src={images[0]} alt="spot" class="image" />
    </figure>
    <div class="gallery-container">
        {#each images.slice(1) as image}
            <figure class="image-container">
                <img src={image} alt="spot" class="image" />
            </figure>
        {/each}
    </div>
</div>

<style>
    .image-gallery {
        display: grid;
        width: 100%;
        height: 100%;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;
    }

    .main-image {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        padding: 0;
        margin: 0;
    }

    .main-image > .image {
        width: 100%;
        height: 100%;
    }

    .image-container {
        background-color: #000;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        padding: 0;
        margin: 0;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }
</style>