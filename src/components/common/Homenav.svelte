<script lang="ts">
	import { slide } from "svelte/transition";
    import Search from "./Search.svelte";
    import UserButton from "./UserButton.svelte";
    import TopRoutes from "./TopRoutes.svelte";
    import { page } from "$app/state";

    let { transition = true } = $props();

    let active = $state(transition);
    let wrapper: HTMLElement;

    export function getActive() {
        return active;
    }

    export function setActive(active: boolean) {
        active = active;
    }

    export function toggleActive() {
        active = !active;
    }

</script>

<nav class="wrapper" bind:this={wrapper}>
    <div class="top-wrapper" >
        <a href="/" class="logo-wrapper" aria-label="Home">
            <img src="/stot.png" alt="logo" />
        </a>
        <div class="middle-wrapper">
            {#if active && !page.url.pathname.includes("/spots/")}
                <div class="top-routes-wrapper" transition:slide>
                    <TopRoutes />
                </div>
            {/if}
            <div class="search-wrapper">
                <Search />
            </div>         
        </div>
        <div class="user-wrapper">
            <UserButton />
        </div>
    </div>
</nav>

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
        margin-block: 1rem;
    }


    .logo-wrapper, .user-wrapper {
        flex: 1 1 0;
        display: flex;
        min-width: 0;
    }

    .logo-wrapper {
        justify-content: flex-start;
        padding-inline-start: 1rem;
    }

    .user-wrapper {
        justify-content: flex-end;
        padding-inline-end: 1rem;
    }


    .logo-wrapper img {
        width: 70%;
        max-width: 7rem;
        object-fit: contain;
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

        .search-wrapper {
            padding-inline-start: 1rem;
            padding-block-start: .5rem;
            width: 100%;
        }

        .user-wrapper {
            padding-inline-end: 1rem;
            justify-content: flex-end;
        }

    }



</style>