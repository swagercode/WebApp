<script>
    import { onMount } from "svelte";

    let currentFilter = $props();

    let searchMenuOpen = $state(false);
    let preferenceMenuOpen = $state(false);

     onMount(() => {
        console.log("Search mounted");
    });
</script>

<div class="search-bar">
    <div class="left-side-wrapper">
        <div class="spacer"></div>
        <button class="search-bar-input-button" >
            <p class="search-text-normal">Start your search for a <span class="search-text-highlight">study spot</span></p>
        </button>
    </div>

    <hr class="search-bar-divider"/>

    <div class="right-side-wrapper">
        <button class="search-bar-filter-button">
            <p class="search-text-normal">Preference: <span class="search-text-highlight">{currentFilter}</span></p>
    </button>

    <button class="search-submit-button" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="none" stroke="#ffffff" stroke-width="36" stroke-linecap="round"
                d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"/>
            </svg> 
        </button>
    </div>
</div>

<style>

    .search-bar {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 4rem;
        border-radius: 10rem;
        padding: .5rem .5rem .5rem .5rem;
        margin: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .right-side-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .left-side-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .spacer {
        width: 1rem;
        height: 100%;
    }

    .search-submit-button {
        aspect-ratio: 1/1;
        width: 3.75rem;
        border: transparent;
        background-color: var(--primary-clr);
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-submit-button svg {
        width: 50%;
        height: 50%;
        display: block;
    }

    .search-bar-filter-button {
        width: 100%;
        height: 100%;
        border: transparent;
        background-color: transparent;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
        text-align: center;
        gap: .2rem;
    }

    .search-bar-divider {
        height: 80%;
        border: var(--font-clr-light) 1px solid;
    }

    .search-bar-input-button {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border: transparent;
        outline: transparent;
        background-color: transparent;
        padding: 0;
        margin: 0;
        text-align: left;
        gap: .2rem;
    }

    .search-bar-input-button, .search-bar-filter-button {
        cursor: pointer;
    }

    .search-header-text {
        font-size: 1rem;
        font-weight: 300;
        color: var(--font-clr-dark);
        margin: 0;
        padding: 0;
    }

    .search-text-normal {
        font-size: .8rem;
        color: var(--font-clr);
        margin: 0;
        padding: 0;
    }

    .search-bar-input-button, .search-text-highlight {
        color: var(--primary-clr);
        margin-block: 0 0 !important;
        padding: 0 !important;
    }

</style>