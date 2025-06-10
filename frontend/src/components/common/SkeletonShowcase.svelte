<script lang="ts">
    import SpotCardSkeleton from './SpotCardSkeleton.svelte';
</script>

<div class="showcase-wrapper">
    <h2>Skeleton Loading Variants</h2>
    
    <div class="variant-section">
        <h3>Card Variant (Default)</h3>
        <div class="skeleton-grid">
            {#each Array(3) as _, index}
                <SpotCardSkeleton delay={index * 100} variant="card" />
            {/each}
        </div>
    </div>
    
    <div class="variant-section">
        <h3>Compact Variant</h3>
        <div class="skeleton-grid">
            {#each Array(4) as _, index}
                <SpotCardSkeleton delay={index * 75} variant="compact" />
            {/each}
        </div>
    </div>
    
    <div class="variant-section">
        <h3>List Variant</h3>
        <div class="skeleton-list">
            {#each Array(5) as _, index}
                <SpotCardSkeleton delay={index * 50} variant="list" />
            {/each}
        </div>
    </div>
    
    <div class="variant-section">
        <h3>Custom Height</h3>
        <div class="skeleton-grid">
            <SpotCardSkeleton delay={0} variant="card" customHeight="300px" />
            <SpotCardSkeleton delay={100} variant="card" customHeight="500px" />
            <SpotCardSkeleton delay={200} variant="card" customHeight="350px" />
        </div>
    </div>
</div>

<style>
    .showcase-wrapper {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .variant-section {
        margin-bottom: 3rem;
    }
    
    .variant-section h3 {
        margin-bottom: 1rem;
        color: #333;
        font-size: 1.2rem;
    }
    
    .skeleton-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .skeleton-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 600px;
    }
    
    h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #2c3e50;
    }
</style> 