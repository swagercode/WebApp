<script lang="ts">
    import SpotImageGallery from "../../../components/spots/spotPage/SpotImageGallery.svelte";
    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();
    
    const placeholderImages = [
        "https://picsum.photos/1000?random=1",
        "https://picsum.photos/300/200?random=2",
        "https://picsum.photos/1000/250?random=3",
        "https://picsum.photos/700/450?random=4",
        "https://picsum.photos/200/200?random=5"
    ];

    let currentCategory = $state("Overall");
</script>



<div class="main-wrapper">
    <div class="title-wrapper">
        <h1 class="title">{data.name} located in {data.city}!</h1>
    </div>
    <figure>
        <div class="image-gallery-wrapper">
            <SpotImageGallery images={placeholderImages} />
        </div>

        <figcaption>
            <div class="info-container">
                <dl>
                    <dt><h1>{data.description}</h1></dt>
                    <dd><span style="color: var(--{data.openNow ? "open-clr" : "closed-clr"});">{data.openNow ? "Open Now" : "Closed"}</span>  {data.hours} ・ <span class="distance-wrapper"><img src={data.distanceByTime[0]} alt="" /> {data.distanceByTime[1]}</span></dd>
                    <dd>⭐{data.rating.overall} ・ {data.reviewCount} reviews</dd>
                    <dd>📞<a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a></dd>
                </dl>
            </div>
            <hr />
            <div class="things-to-know-wrapper">
                <h1>Things to Know</h1>
                <ul class="things-to-know-list">
                    {#each data.thingsToKnow as thing}
                        <li><img src={thing[0]} alt="" /> {thing[1]}</li>
                    {/each}
                </ul>
            </div>
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
        align-items: flex-start;
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
        align-items: flex-start;
        justify-content: space-between;
    }

    .info-container {
        width: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    hr {
        width: 3px;
        height: 20rem;
        background-color: var(--font-clr-light);
        border: none;
        border-radius: 1rem;
        align-self: center;
    }

    dl {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.5rem;
    }

    img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline;
    }

    a {
        color: var(--font-clr-dark);
    }

    .things-to-know-wrapper {
        width: 50%;
        padding-inline-start: 1rem;
    }

    .things-to-know-list {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.5rem;
        list-style: none;
    }

    .things-to-know-list li img {
        width: 1.2rem;
        height: 1.2rem;
        display: inline;
    }
</style>
