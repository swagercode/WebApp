<script lang="ts">
    let { features } = $props();
</script>

<section class="features">
    <h2>Things to know</h2>
    <div class="features-grid">
        {#each features as feature}
            {#if feature.available}
                <div class="feature-item">
                    <span class="feature-icon">{feature.icon}</span>
                    <span class="feature-name">{feature.name}</span>
                </div>
            {/if}
        {/each}
    </div>
</section>

<style>
    .features {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }
    
    .features h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background-color: #f9f9f9;
        border-radius: 0.5rem;
    }
    
    .feature-icon {
        font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
        .features-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 