<script lang="ts">
    let { images } = $props();
</script>

<div class="image-gallery">
    {#each images as image}
        <figure class="image-container">
            <img src={image} alt="spot" class="image" />
        </figure>
    {/each}
</div>

<style>
    .image-gallery {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .image-container {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
    }
</style>