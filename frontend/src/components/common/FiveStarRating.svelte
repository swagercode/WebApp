<script lang="ts">
    let rating = $state(0);
    let hoverRating = $state(0);
    const stars = [0, 1, 2, 3, 4];

    function ratingColor(star: number): string { // im considering making it so when u click a star, all the stars animate like a flash of a brighter color
        if (star > rating && star <= hoverRating) {
            return "var(--brighter-primary-clr)";
        }
        else if (star <= rating) {
            return "var(--primary-clr)";
        }
        return "var(--font-clr)";
    }
</script>
<div class="five-star-rating" onmouseleave={() => {hoverRating = 0}} aria-label="Five star rating" role="group">
    {#each stars as star}
        <button class="star" aria-label={`${star} star rating`}      
            onmouseenter={() => {hoverRating = star}}
            onclick={() => {rating = star}}
        >
            <div class="star-container">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42.04825" height="40.2" viewBox="0,0,42.04825,40.2"><g transform="translate(-218.96759,-158.9)">
                    <g fill={ratingColor(star)}><path d="M260.2,176.7l-8.2,8l1.8,11.3c0.2,1 -0.2,2 -1,2.6c-0.4,0.3 -1,0.5 -1.5,0.5c-0.4,0 -0.8,-0.1 -1.2,-0.3l-10.1,-5.3l-10.2,5.3c-0.4,0.2 -0.8,0.3 -1.2,0.3c-0.5,0 -1,-0.2 -1.5,-0.5c-0.8,-0.6 -1.2,-1.6 -1,-2.6l1.9,-11.2l-8.2,-8c-0.8,-0.7 -1,-1.7 -0.7,-2.7c0.3,-1 1.1,-1.7 2.1,-1.8l11.3,-1.6l5.1,-10.3c0.5,-0.9 1.4,-1.5 2.4,-1.5c1,0 2,0.6 2.4,1.5l5.1,10.3l11.3,1.6c1,0.2 1.8,0.8 2.1,1.8c0.3,0.9 0,2 -0.7,2.6z"/></g></g></svg>
            </div>
        </button>
    {/each}
</div>

<style>

    :global(:root) {
        --font-clr: #7A7A7A;
        --primary-clr: #EF934B;
        --brighter-primary-clr: #ff903c;
        --faded-primary-clr: #EF934B;
        --hover-clr: #F5F5F5;
        --open-clr: #628F66;
        --closed-clr: #C60000;
        --gray-button-clr: #F2F2F2;
        --gray-button-hover-clr: #EBEBEB;

        --rating-clr: #F0C0A2;
    }   

    .five-star-rating {
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
    }

    .star {
        width: 20%;
        cursor: pointer;
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
    }

    .star-container {
        width: 100%;
        height: 100%;
    }

    .star-container svg {
        width: 100%;
        height: 100%;
    }

    .star-container svg g {
        transition: fill 0.2s ease-in-out;
    }

    /* @keyframes flash {
        from {
            fill: var(--primary-clr);
        }
        to {
            fill: var(--brighter-primary-clr);
        }
        to {
            fill: var(--primary-clr);
        }
    } */
</style>