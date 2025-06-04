<script lang="ts"> 
    import { scale } from 'svelte/transition';

    let selectedButton = $props();

    const gentleBack = (t: number) => {
        const s = 1.2;
        return --t * t * ((s + 1) * t + s) + 1;
    };
</script>


<div class="wrapper">
    <a href="/" transition:scale={{duration: 500, easing: gentleBack}}>
        <img src="/nav-icons/search-icon.png" alt="search" />
        <h1 class="button-text">SEARCH</h1>
    </a>
    <a href="/maps" transition:scale={{duration: 550, easing: gentleBack}}>
        <img src="/nav-icons/maps-icon.png" alt="maps" />
        <h1 class="button-text">MAPS</h1>
    </a>
    <a href="/groups" transition:scale={{duration: 500, easing: gentleBack}}>
        <img src="/nav-icons/groups-icon.png" alt="groups" />
        <h1 class="button-text">GROUPS</h1>
    </a>
</div>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        gap: 2.5rem;    
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: transparent;
        cursor: pointer;
        width: 4rem;
        text-decoration: none;
    }

    a img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: fill;
        padding: 0;
        margin: 0;
    }

    a h1 {
        font-size: 1rem;
        font-weight: 300;
        color: var(--font-clr-dark);
        padding: 0;
        margin: 0;
    }

</style>

