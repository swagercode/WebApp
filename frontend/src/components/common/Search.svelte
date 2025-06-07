<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import SearchMenu from "./SearchMenu.svelte";
    let currentFilter = $props();

    let searchMenuOpen = $state(false);
    let preferenceMenuOpen = $state(false);
    
    // Reactive states for divider animation
    let dividerExpandLeft = $derived(searchMenuOpen);
    let dividerExpandRight = $derived(preferenceMenuOpen);

    // Element references and dimensions
    let searchMenuElem: SearchMenu | null = $state(null);
    let searchLeftButton: HTMLButtonElement;
    let searchLeftWrapper: HTMLDivElement;
    let searchLeftText: HTMLParagraphElement;
    let searchLeftHighlight: HTMLSpanElement;

    let preferenceRightButton: HTMLButtonElement;
    let preferenceRightWrapper: HTMLDivElement;
    let preferenceRightText: HTMLParagraphElement;
    let preferenceRightHighlight: HTMLSpanElement;

    let dividerElement: HTMLHRElement;
    let searchBarElement: HTMLDivElement;

    // Dynamic scaling values
    let leftScaleX = $state(50);
    let rightScaleX = $state(50);
    let scaleY = $state(6);

    // Function to calculate dynamic scaling
    function calculateScaling(): void {
        if (!searchBarElement || !dividerElement || !searchLeftWrapper || !preferenceRightWrapper) return;
        
        const searchBarRect = searchBarElement.getBoundingClientRect();
        const dividerRect = dividerElement.getBoundingClientRect();
        const leftWrapperRect = searchLeftWrapper.getBoundingClientRect();
        const rightWrapperRect = preferenceRightWrapper.getBoundingClientRect();
        
        // Calculate scale needed to cover each side
        const dividerWidth = dividerRect.width;
        const searchBarHeight = searchBarRect.height;
        
        // Scale X to cover the width of each wrapper
        leftScaleX = Math.max(1, (rightWrapperRect.width / dividerWidth) * 1.1);
        rightScaleX = Math.max(1, (leftWrapperRect.width / dividerWidth) * 1.1);
        
        // Scale Y to cover the height of the search bar
        scaleY = Math.max(1, (searchBarHeight / dividerRect.height) * 1.2);
    }

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

        // Calculate initial scaling and set up resize listener
        setTimeout(calculateScaling, 100); // Small delay to ensure elements are rendered
        
        const resizeObserver = new ResizeObserver(() => {
            calculateScaling();
        });
        
        if (searchBarElement) {
            resizeObserver.observe(searchBarElement);
        }

        return () => {
            resizeObserver.disconnect();
        };
    });

    $inspect(searchMenuOpen);
</script>

<div class="search-bar" bind:this={searchBarElement}>
    <div class="left-side-wrapper" bind:this={searchLeftWrapper}>
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

    <hr class="search-bar-divider" class:expand-left={dividerExpandLeft} class:expand-right={dividerExpandRight} bind:this={dividerElement} style="--scale-x-left: {rightScaleX}; --scale-x-right: {leftScaleX}; --scale-y: {scaleY};" />

    <div class="right-side-wrapper" bind:this={preferenceRightWrapper} >
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
        transition: all 0.3s ease-in-out;
        transform-origin: center;
        position: relative;
        z-index: 1;
    }

    .search-bar-divider.expand-left {
        transform: scaleX(var(--scale-x-right)) scaleY(var(--scale-y));
        transform-origin: left center;
        background-color: var(--font-clr-light);
        opacity: 0.8;
        z-index: -1;
        border-radius: 0 10rem 10rem 0;
    }

    .search-bar-divider.expand-right {
        transform: scaleX(var(--scale-x-left)) scaleY(var(--scale-y));
        transform-origin: right center;
        background-color: var(--font-clr-light);
        opacity: 0.8;
        z-index: -1;
        border-radius: 10rem 0 0 10rem;
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