<script lang="ts"> 
    import { scale } from 'svelte/transition';
    import { page } from '$app/state';

    const gentleBack = (t: number) => {
        const s = 1.2;
        return --t * t * ((s + 1) * t + s) + 1;
    };
</script>


<div class="wrapper">
    <a href="/" transition:scale={{duration: 500, easing: gentleBack}}>
        <img src="/nav-icons/search-icon.png" alt="search" />
        {#if page.url.pathname === "/"}
            <h1 class="button-text" style="color: var(--font-clr-dark);">SEARCH</h1>
            <hr class="selected-line" />
        {:else}
            <h1 class="button-text">SEARCH</h1>
        {/if}
    </a>
    <a href="/map" transition:scale={{duration: 550, easing: gentleBack}}>
        <img src="/nav-icons/maps-icon.png" alt="maps" />
        {#if page.url.pathname === "/map"}
            <h1 class="button-text" style="color: var(--font-clr-dark);">MAPS</h1>
            <hr class="selected-line" />
        {:else}
            <h1 class="button-text">MAPS</h1>
        {/if}
    </a>
    <a href="/groups" transition:scale={{duration: 500, easing: gentleBack}}>
        <img src="/nav-icons/groups-icon.png" alt="groups" />
        {#if page.url.pathname === "/groups"}
            <h1 class="button-text" style="color: var(--font-clr-dark);">GROUPS</h1>
            <hr class="selected-line" />
        {:else}
            <h1 class="button-text">GROUPS</h1>
        {/if}
    </a>
</div>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        justify-content: center;
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
        color: var(--font-clr);
        padding: 0;
        margin: 0;
    }

    .selected-line {
        width: 125%;
        height: 1px;
        background-color: var(--font-clr-dark);
        margin: 0;
        padding: 0;
    }

</style>

