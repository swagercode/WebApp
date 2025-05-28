<script lang="ts">
    import FiveStarRating from "../common/FiveStarRating.svelte";
    let page = $state(0);
    const categories = ["Atmosphere", "Comfort", "Quiet", "Seating"];
</script>


<div class="review-menu">
    <h1 class="review-menu-title">Leave a review</h1>
    {#if page === 0}
        <div class="review-menu-content">
            {#each categories as category}
                <div class="review-menu-category-container">
                    <span class="review-menu-category">{category}</span>
                    <div class="review-menu-rating">
                        <FiveStarRating />
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .review-menu {
        display: flex;
        flex-direction: column;
        background-color: white;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
    }

    .review-menu-title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .review-menu-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .review-menu-category-container {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        align-items: center;
        padding-block-end: 1rem;
    }

    .review-menu-rating {
        box-sizing: border-box;
        height: 3rem;
    }
    

    
    
</style>

