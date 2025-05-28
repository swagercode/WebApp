<script lang="ts">
    import type { Rating } from '../types';
    
    let { rating } = $props();
</script>

<section class="category-ratings">
    <h2>Ratings</h2>
    <div class="ratings-grid">
        <div class="rating-item">
            <span class="category">Atmosphere</span>
            <span class="stars">★ {rating.atmosphere}</span>
        </div>
        <div class="rating-item">
            <span class="category">Comfort</span>
            <span class="stars">★ {rating.comfort}</span>
        </div>
        <div class="rating-item">
            <span class="category">Quiet</span>
            <span class="stars">★ {rating.quiet}</span>
        </div>
        <div class="rating-item">
            <span class="category">Seating</span>
            <span class="stars">★ {rating.seating}</span>
        </div>
    </div>
</section>

<style>
    .category-ratings {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }
    
    .category-ratings h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .ratings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .rating-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background-color: #f9f9f9;
        border-radius: 0.5rem;
    }
    
    .stars {
        color: var(--rating-clr, #F0C0A2);
    }
    
    @media (max-width: 768px) {
        .ratings-grid {
            grid-template-columns: 1fr;
        }
    }
</style> 