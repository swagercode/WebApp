<script lang="ts">
    import FiveStarRating from "../common/FiveStarRating.svelte";
    let { closeReviewMenu } = $props();
    let page = $state(0);
    const categories = ["Atmosphere", "Comfort", "Quiet", "Seating"];
    let reviewText = $state("");

    function postReview() {
        page = 2;
        console.log("Posting review");
        setTimeout(() => {
            closeReviewMenu();
        }, 3000);
    }

</script>


<div class="review-menu">
    {#if page !== 2}
        <h1 class="review-menu-title">Leave a review</h1>
    {/if}
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
    {:else if page === 1}
        <form class="review-menu-form">
            <textarea class="review-menu-text-area" placeholder="Write your review here" bind:value={reviewText}></textarea>
        </form>
    {:else if page === 2}
        <div class="review-menu-content">
            <h2>Thank you for your review!</h2>
            <p>You're helping others find the best study spots!</p>
        </div>
    {/if}
    <footer class="review-menu-footer">
        {#if page === 0}
            <button class="review-menu-footer-button" onclick={closeReviewMenu}>Cancel</button>
            <button class="review-menu-footer-button" onclick={() => page = 1}>Next</button>
        {:else if page === 1}
            <button class="review-menu-footer-button" onclick={() => page = 0}>Back</button>
            <button class="review-menu-footer-button" onclick={postReview}>{reviewText ? "Post" : "Skip"}</button>
        {/if}
    </footer>
</div>

<style>
    
    :root {
        color: var(--font-clr);
    }

    .review-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: var(--bg-clr);
        border-radius: 1rem;
        padding: 1rem 1rem 0 1rem;
    }

    .review-menu-title {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--primary-clr);
    }

    .review-menu-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .review-menu-content h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-clr);
    }

    .review-menu-category-container {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        align-items: center;
        padding-block-end: 1rem;
    }

    .review-menu-category {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .review-menu-rating {
        height: 3rem;
        width: 70%;
    }

    .review-menu-footer {
        display: flex;
        width: 80%;
        justify-content: space-evenly;
        align-items: center;
        padding-block-end: 1rem;
    }

    .review-menu-footer-button {
        background-color: var(--primary-clr);
        color: var(--bg-clr);
        border: none;
        border-radius: 0.5rem;
        margin-block-end: 0.5rem;
        width: 5rem;
        height: 3rem;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
    }

    .review-menu-text-area {
        width: 100%;
        height: 10rem;
        padding: 1rem 1rem 1rem 1rem;
        margin-block-end: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--font-clr);
        resize: none;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--font-clr);
    }

    .review-menu-form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    
</style>

