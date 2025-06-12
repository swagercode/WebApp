<script lang="ts">
    import SpotImageGallery from "../../../components/spots/spotPage/SpotImageGallery.svelte";
    import FractionalStarReviews from "../../../components/spots/spotPage/FractionalStarReviews.svelte";
    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();
    
    let spotName = $state(data.spotName);
    let spotCity = $state(data.spotCity);
    let spotRating = $state(data.spotRating);
    let spotReviews = $state(data.spotReviews);
    let spotHours = $state(data.spotHours);
    let spotImages = $state(data.spotImages);
    let openNow = $state(data.openNow);

    const placeholderImages = [
        "https://picsum.photos/1000?random=1",
        "https://picsum.photos/300/200?random=2",
        "https://picsum.photos/1000/250?random=3",
        "https://picsum.photos/700/400?random=4",
        "https://picsum.photos/200/200?random=5"
    ];

    let currentCategory = $state("Overall");
</script>


<div class="main-wrapper">
    <figure>
        <div class="title-wrapper">
            <h1 class="title">{spotName} located in {spotCity}!</h1>
        </div>

        <div class="image-gallery-wrapper">
            <SpotImageGallery images={placeholderImages} />
        </div>
        <figcaption>
            <div class="rating-wrapper">
                <dt class="sr-only">Rating</dt>
                <dd><h1>{spotRating.overall} {currentCategory}</h1></dd>
                <dd class="rating-stars">
                    <FractionalStarReviews rating={spotRating} />
                </dd>
            </div>
            <hr />
            <div class="hours-wrapper">
                <dl>
                    <dt class="sr-only">Open</dt>
                    <dd style="color: var(--{openNow ? "open-clr" : "closed-clr"});">{openNow ? "Open" : "Closed"}</dd>
                    <dd>{spotHours}</dd>
                </dl>
            </div>
            <hr />
            <div class="reviews-wrapper">
                <dl>
                    <dt class="sr-only">Reviews</dt>
                    <dd>
                        <h2>{spotReviews.length}</h2>
                    </dd>
                    <dd>
                        <h2>Reviews</h2>
                    </dd>

                </dl>
            </div>
            <hr />

        </figcaption>
    </figure>


</div>

<style> 
    .main-wrapper {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .title {
        font-size: 2rem;
        font-weight: 600;
        text-align: left;
    }

    .title-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-block-start: 1rem;
    }

    .image-gallery-wrapper {
        width: 100%;
        height: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    figcaption {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
    }

    .rating-stars {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    hr {
        width: 3px;
        height: 3rem;
        background-color: var(--font-clr-light);
        border: none;
        border-radius: 1rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    dd {
        text-align: center;
    }

</style>
