<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import SearchMenu from "./SearchMenu.svelte";
    let currentFilter = $props();

    let searchMenuOpen = $state(false);
    let preferenceMenuOpen = $state(false);

    let searchMenuElem: SearchMenu | null = $state(null);
    let searchLeftButton: HTMLButtonElement;
    let searchLeftWrapper: HTMLDivElement;
    let searchLeftText: HTMLParagraphElement;
    let searchLeftHighlight: HTMLSpanElement;

    let preferenceRightButton: HTMLButtonElement;
    let preferenceRightWrapper: HTMLDivElement;
    let preferenceRightText: HTMLParagraphElement;
    let preferenceRightHighlight: HTMLSpanElement;

     onMount(() => {
        console.log("Search mounted");
        let searchLeftList: Array<any> = [searchMenuElem, searchLeftButton, searchLeftWrapper, searchLeftText, searchLeftHighlight];
        let preferenceRightList: Array<any> = [preferenceRightButton, preferenceRightWrapper, preferenceRightText, preferenceRightHighlight];

        document.addEventListener("click", (event) => {
            if (!searchLeftList.includes(event.target) && searchMenuOpen) {
                searchMenuOpen = false;
            }
            else if (!preferenceRightList.includes(event.target) && preferenceMenuOpen) {
                preferenceMenuOpen = false;
            }
        });
    });

    $inspect(searchMenuOpen);
</script>

<div class="search-bar">
    <div class="left-side-wrapper" bind:this={searchLeftWrapper}>
        {#if preferenceMenuOpen}
            <div class="left-side-cover" transition:fly={{duration: 200}}></div>
        {/if}
        <div class="spacer"></div>
        <button class="search-bar-input-button" onclick={() => {
            searchMenuOpen = !searchMenuOpen;
        }}
        bind:this={searchLeftButton}>
            <p class="search-text-normal" bind:this={searchLeftText}>Start your search for a <span class="search-text-highlight" bind:this={searchLeftHighlight}>study spot</span></p>
        </button>
        {#if searchMenuOpen}
            <div class="search-menu-wrapper" transition:fly={{duration: 200}}>
                    <SearchMenu bind:this={searchMenuElem}/>  
            </div>
        {/if}
    </div>

    <hr class="search-bar-divider"/>

    <div class="right-side-wrapper" bind:this={preferenceRightWrapper} >
        {#if searchMenuOpen}
            <div class="right-side-cover" transition:fly={{duration: 200}}></div>
        {/if}
        <button class="search-bar-filter-button" onclick={() => {
            preferenceMenuOpen = !preferenceMenuOpen;
        }} bind:this={preferenceRightButton}>
            <p class="search-text-normal" bind:this={preferenceRightText}>Preference: <span class="search-text-highlight" bind:this={preferenceRightHighlight}>{currentFilter}</span></p>
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

    .left-side-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .right-side-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .left-side-cover {
        position: absolute;
        top: -.5rem;
        left: -.5rem;
        width: calc(100% + .7rem);
        height: 4rem;
        background-color: var(--font-clr-light);
        border-radius: 10rem 0 0 10rem;
        z-index: -1;
    }

    .right-side-cover {
        position: absolute;
        top: -.5rem;
        right: -.5rem;
        width: calc(100% + .7rem);
        height: 4rem;
        background-color: var(--font-clr-light);
        border-radius: 0 10rem 10rem 0;
        z-index: -1;
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
        background-color: var(--font-clr-light);
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

    .search-menu-wrapper {
        position: absolute;
        top: 4rem;
        left: -1rem;
        width: 95%;
        height: 30rem;
        z-index: 1000;
    }


</style>