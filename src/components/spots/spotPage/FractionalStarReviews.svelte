<script lang="ts">
    import { getCurrCategory } from "../../../lib/index.svelte";
    import type { Rating } from "../../types";

    let { rating }: { rating: Rating } = $props();

    let currCategory = $state("overall");

    const stars = Array(5).fill(0);
    
    let currRating: number = $derived(getCurrCategory(rating, currCategory) ?? 3.5);

</script>

<svg width="0" height="0" class="hidden">
    <defs>
        <mask id="star-mask">
            <path d="M12 2l2.4 7.3h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" fill="white"/>
        </mask>
    </defs>
</svg>

<div class="rating-container">
    <div class="stars-background">
        {#each stars as _}
            <div class="star-container">
                <div class="star-fill" style="width: {currRating > 0 ? Math.min(1, currRating) * 100 : 0}%">
                    <div class="star"></div>
                </div>
                <div class="star star-outline"></div>
            </div>
        {/each}
    </div>
</div>

<style>
    .hidden {
        position: absolute;
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .rating-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .stars-background {
        display: flex;
        gap: 0.25rem;
    }

    .star-container {
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
    }

    .star-fill {
        position: absolute;
        height: 100%;
        overflow: hidden;
    }

    .star {
        width: 100%;
        height: 100%;
        background-color: #FFD700;
        mask: url(#star-mask);
        -webkit-mask: url(#star-mask);
        mask-size: contain;
        -webkit-mask-size: contain;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-position: center;
    }

    .star-outline {
        background-color: #E0E0E0;
    }
</style>