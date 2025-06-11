<script lang="ts">
    import { onNavigate, afterNavigate } from '$app/navigation';
    import '../global.css';
    import Homenav from '../components/common/Homenav.svelte';
    import { onMount } from 'svelte';
	import { page } from '$app/state';
    import { MediaQuery } from 'svelte/reactivity';

    let { children } = $props();

    const isMobile = new MediaQuery("max-width: 650px");

    onNavigate((navigation) => {
        

        if (!document.startViewTransition) return;
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    afterNavigate(() => {
        if (isMobile.current) {
            document.documentElement.style.setProperty('--header-height', `60px`);
            return;
        }
        if (page.url.pathname.includes("/spots/")) {
            document.documentElement.style.setProperty('--header-height', `calc(96px + 1rem)`);
        }
        else {
            document.documentElement.style.setProperty('--header-height', `calc(96px + 82.333333px + 1rem)`);
        }
    });

    let header: Homenav;
    let lastScrollY = $state(0);
    let mainWrapper: HTMLElement;

    onMount(() => {
        window.addEventListener('scroll', () => {
            if ((window.scrollY === 0 && lastScrollY !== 0) || (window.scrollY !== 0 && lastScrollY === 0)) {
                if (header) {
                    header.toggleActive();
                }
            }
            lastScrollY = window.scrollY;
        });
    });
</script>

<div class="layout">
    <div class="head-wrapper">
        <Homenav bind:this={header}/>
    </div>

    <div class="main-wrapper" bind:this={mainWrapper}>
        {@render children()}
    </div>
</div>

<style>
    .layout {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .head-wrapper {
        top: 0;
        width: 100%;
    }

    .main-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: calc(var(--header-height, 0px) + 1rem);
        margin: 0;
    }
</style>






