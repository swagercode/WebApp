<script lang="ts">
    import type { Spot } from '../types';
    
    let { spot, reviews, hours } = $props();
</script>

<section class="spot-info">
    <h1 class="spot-title">{spot.name}</h1>
    <div class="rating-overview">
        <span class="overall-rating">★ {spot.rating.overall}</span>
        <span class="rating-count">({reviews.length} reviews)</span>
    </div>
    <p class="spot-location">{spot.location}</p>
    <p class="spot-distance">{spot.distance}</p>
    <p class="spot-hours">Hours: {hours}</p>
    <p class="spot-status" class:open={spot.openStatus} class:closed={!spot.openStatus}>
        {spot.openStatus ? 'Open now' : 'Closed'}
    </p>
</section>

<style>
    .spot-info {
        margin-bottom: 2rem;
    }
    
    .spot-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .rating-overview {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .overall-rating {
        font-size: 1.2rem;
        color: var(--rating-clr, #F0C0A2);
    }
    
    .rating-count {
        color: var(--font-clr, #7A7A7A);
    }
    
    .spot-location, .spot-distance, .spot-hours {
        color: var(--font-clr, #7A7A7A);
        margin-bottom: 0.5rem;
    }
    
    .spot-status {
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .spot-status.open {
        color: var(--open-clr, #628F66);
    }
    
    .spot-status.closed {
        color: var(--closed-clr, #C60000);
    }
</style> 