<script lang="ts">
    let { images, spotName } = $props();
    
    let currentImageIndex = $state(0);
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    }
    
    function goToImage(index: number) {
        currentImageIndex = index;
    }
</script>

<section class="image-gallery">
    <div class="image-container">
        <img src={images[currentImageIndex]} alt={spotName} />
        <button class="nav-btn prev-btn" onclick={prevImage}>‹</button>
        <button class="nav-btn next-btn" onclick={nextImage}>›</button>
    </div>
    <div class="image-dots">
        {#each images as _, index}
            <button 
                class="dot"
                class:active={index === currentImageIndex}
                onclick={() => goToImage(index)}
                aria-label="Go to image {index + 1}"
            ></button>
        {/each}
    </div>
</section>

<style>
    .image-gallery {
        margin-bottom: 2rem;
    }
    
    .image-container {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: 1rem;
        overflow: hidden;
    }
    
    .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.8);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .prev-btn {
        left: 1rem;
    }
    
    .next-btn {
        right: 1rem;
    }
    
    .image-dots {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        background-color: #ccc;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .dot.active {
        background-color: var(--active-clr, #EF934B);
    }
    
    @media (max-width: 768px) {
        .image-container {
            height: 300px;
        }
    }
</style> 