<script lang="ts">
	import { slide } from "svelte/transition";
    import { MediaQuery } from "svelte/reactivity";
    import Search from "./Search.svelte";
    import UserButton from "./UserButton.svelte";
    import Routes from "./Routes.svelte";
    import { page } from "$app/state";

    let { transition = true } = $props();

    let active = $state(transition);
    let wrapper: HTMLElement;
    const isMobile = new MediaQuery("max-width: 784px");

    export function getActive() {
        return active;
    }

    export function setActive(active: boolean) {
        active = active;
    }

    export function toggleActive() {
        active = !active;
    }

    let currentFilter = $state("All");

</script>

<nav class="wrapper" bind:this={wrapper}>
    <div class="top-wrapper" style="width: {page.url.pathname.includes("/spots/") ? "70%" : "100%"}">
        {#if !isMobile.current}
                <a href="/" class="logo-wrapper" aria-label="Home" style="padding-inline-start: {page.url.pathname.includes("/spots/") ? "0" : "1rem"}">
                    <img src="/main-logos/stot.png" alt="logo" />
                </a>
        {/if}
        <div class="middle-wrapper">
            {#if active && !page.url.pathname.includes("/spots/") && !isMobile.current}
                <div class="top-routes-wrapper" transition:slide>
                    <Routes isMobile={false} />
                </div>
            {/if}
            <div class="search-wrapper">
                <Search {currentFilter} />
            </div>         
        </div>
        {#if !isMobile.current}
        <div class="user-wrapper" style="padding-inline-end: {page.url.pathname.includes("/spots/") ? "0" : "1rem"}">
            <UserButton />
        </div>
        {/if}

    </div>
</nav>

{#if isMobile.current}
    <div class="mobile-wrapper">
        <Routes isMobile={true} />
    </div>
{/if}


<style>

    .wrapper {
        position: fixed;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--bg-clr);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        z-index: 1000;

        view-transition-name: home-nav;
    }

    .top-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-block: 2rem;
    }


    .logo-wrapper, .user-wrapper {
        flex: 1 1 0;
        display: flex;
        min-width: 0;
    }

    .logo-wrapper {
        justify-content: flex-start;
        padding-inline-start: 1rem;
        width: 3rem;
        height: 3rem;

        view-transition-name: home-nav-logo;
    }

    .logo-wrapper img {
        height: 100%;
        object-fit: contain;
    }

    .user-wrapper {
        justify-content: flex-end;
        padding-inline-end: 1rem;

        view-transition-name: home-nav-user;
    }

    .middle-wrapper {
        flex: 2 1 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 0;
    }

    .search-wrapper {
        width: 90%;
        height: 100%;
    }

    .top-routes-wrapper {
        width: 100%;
        padding-block-end: 1rem;
        z-index: 1000;
    }

    .logo-wrapper, .user-wrapper {
        transition: transform 0.3s ease-in-out;

        @media (prefers-reduced-motion: reduce) {
            view-transition-name: none !important;
        } 
    }

    .mobile-wrapper {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 1000;
        background-color: var(--bg-clr);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        padding-block-end: 1rem;
        transform: translateY(5%);
    }

    @media (max-width: 784px) {
        .logo-wrapper, .logo-wrapper img {
            display: none;
        }

        .middle-wrapper {
            flex: 1 1 0;
        }

        .top-wrapper {
            justify-content: space-between;
            width: 100%;
        }

        .user-wrapper {
            padding-inline-end: 1rem;
            justify-content: flex-end;
        }
    }
</style>