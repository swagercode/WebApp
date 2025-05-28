<script lang="ts">
    import SpotReviewMenu from "./SpotReviewMenu.svelte";
    let { reviews } = $props();

    let reviewOpen = $state(false);

    function onclick() {
        reviewOpen = !reviewOpen;
    }
</script>

<section class="reviews">
    {#if reviewOpen}
        <div class="review-menu-container-background"></div>
        <div class="review-menu-container">
            <SpotReviewMenu />
        </div>
    {/if}
    <div class="reviews-header">
        <h2>Reviews</h2>
        <button class="leave-review-btn" {onclick} >Leave a review</button>
    </div>
    
    <div class="reviews-list">
        {#each reviews as review}
            <div class="review-item">
                <div class="review-header">
                    <img src={review.userAvatar} alt={review.userName} class="user-avatar" />
                    <div class="user-info">
                        <h4 class="user-name">{review.userName}</h4>
                        <span class="review-date">{review.date}</span>
                    </div>
                    <div class="review-rating">★ {review.rating.overall}</div>
                </div>
                
                <div class="review-categories">
                    <span>Atmosphere: ★ {review.rating.atmosphere}</span>
                    <span>Comfort: ★ {review.rating.comfort}</span>
                    <span>Quiet: ★ {review.rating.openLate}</span>
                    <span>Seating: ★ {review.rating.seating}</span>
                </div>
                
                <p class="review-text">{review.text}</p>
            </div>
        {/each}
    </div>
</section>

<style>
    .reviews {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }
    
    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .reviews h2 {
        font-size: 1.5rem;
    }
    
    .leave-review-btn {
        background-color: var(--active-clr, #EF934B);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 600;
    }
    
    .leave-review-btn:hover {
        opacity: 0.9;
    }
    
    .review-item {
        background-color: #f9f9f9;
        padding: 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
    }
    
    .review-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    .user-info {
        flex: 1;
    }
    
    .user-name {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
    }
    
    .review-date {
        color: var(--font-clr, #7A7A7A);
        font-size: 0.9rem;
    }
    
    .review-rating {
        color: var(--rating-clr, #F0C0A2);
        font-weight: 600;
    }
    
    .review-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: var(--font-clr, #7A7A7A);
    }
    
    .review-text {
        margin: 0;
        line-height: 1.5;
    }

    .review-menu-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
        z-index: 1000;
    }

    .review-menu-container-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        backdrop-filter: blur(10px);
    }
</style> 