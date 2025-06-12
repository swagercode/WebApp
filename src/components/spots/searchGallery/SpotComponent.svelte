<script lang="ts">
    import { goto } from '$app/navigation';
    import { currentCategory, getCurrCategory } from "../../../lib/index.svelte";
    import '../../../global.css';

    let { spot } = $props();

    
</script>


<a href={`/spots/${spot.id}`}>
    <article>
        <figure>
            <img src={spot.images[0]} alt={spot.name} />
        </figure>
        <dl>
            <dt>
                <span>{spot.name}</span><span>{getCurrCategory(spot.rating, currentCategory.name)}<span style="color: var(--rating-clr)">★</span><span class="sr-only">Rating Category is {currentCategory.name}</span></span>
            </dt>
            <dd>
                {spot.distance}
            </dd>
            <dd style="color: var(--{spot.openStatus ? "open-clr" : "closed-clr"})">
                {spot.openStatus ? "Open now" : "Closed"}
            </dd>
        </dl>
    </article>
</a>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: none;
        color: var(--font-clr-dark) !important;
    }

    article {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    article figure {
        width: 100%;
        height: 100%;
    }

    article figure img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 2rem;
    }

    article dl {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    article dt {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--font-clr-dark) !important;
    }

    article dt span {
        display: inline-block;
    }

    article dd {
        font-size: 0.8rem;
        color: var(--font-clr-dark);
    }
</style>