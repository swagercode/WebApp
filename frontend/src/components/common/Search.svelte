<script>
    import { onMount } from "svelte";

    let currentFilter = $props();

     onMount(() => {
        console.log("Search mounted");
    });
</script>

<div class="search-bar">
    <button class="search-bar-input-button" >
        <h2 class="search-header-text">Search</h2>
        <p class="search-text-normal">Find your next <span class="search-text-highlight">study spot</span></p>
    </button>

    <div class="search-bar-divider-wrapper">
        <hr class="search-bar-divider"/>
    </div>


    <div class="search-bar-filter-wrapper">
        <button class="search-bar-filter-button">
            <h2 class="search-header-text">Filter</h2>
            <p class="search-text-highlight">{currentFilter}</p>
        </button>
    </div>

    <button class="search-submit-button" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="none" stroke="#ffffff" stroke-width="36" stroke-linecap="round"
            d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"/>
        </svg> 
    </button>
</div>

<style>

    .search-bar {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 4.3rem;
        border-radius: 10rem;
        padding: .5rem .5rem .5rem .5rem;
        margin: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .search-submit-button {
        aspect-ratio: 1/1;
        width: 3.5rem;
        border: transparent;
        background-color: var(--primary-clr);
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-submit-button svg {
        width: 60%;
        height: 60%;
        display: block;
    }

    .search-bar-filter-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-bar-filter-button {
        width: 100%;
        height: 100%;
        border: transparent;
        background-color: transparent;
        padding: 0;
        margin: 0;
        text-align: left;
    }

    .search-bar-divider-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-bar-divider {
        height: 100%;
        background-color: var(--font-clr);

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
        margin-inline-start: 1rem;
        text-align: left;
        gap: .2rem;
    }

    .search-header-text {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--font-clr-dark);
        margin: 0;
        padding: 0;
    }

    .search-text-normal {
        font-size: 1rem;
        color: var(--font-clr);
        margin: 0;
        padding: 0;
    }

    .search-bar-input-button .search-text-highlight {
        color: var(--primary-clr);
        margin: 0;
        padding: 0;
    }
</style>