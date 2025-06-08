<script lang="ts">
    import { onNavigate } from '$app/navigation';
    import '../global.css';
    import Homenav from '../components/common/Homenav.svelte';
    import { onMount } from 'svelte';
    
    let { children } = $props();

    onNavigate((navigation) => {
           if (!document.startViewTransition) return;
           return new Promise((resolve) => {
            document.startViewTransition( async () => {
                resolve();
                await navigation.complete;
            });
           });
    });

    let header: Homenav;
    let lastScrollY = $state(0);
    let offsetHeight = $state(0);
    let mainWrapper: HTMLElement;

    onMount(() => {
        // Use requestAnimationFrame to ensure DOM is fully rendered
        requestAnimationFrame(() => {
            if (header) {
                const height = header.getOffsetHeight();
                if (height !== null && height !== undefined) {
                    offsetHeight = height;
                    if (mainWrapper) {
                        mainWrapper.style.marginTop = `calc(${offsetHeight}px + 1rem)`;
                    }
                }
            }
        });
        
        window.addEventListener('resize', () => {
            if (header) {
                const height = header.getOffsetHeight();
                if (height !== null && height !== undefined) {
                    offsetHeight = height;
                    if (mainWrapper) {
                        mainWrapper.style.marginTop = `calc(${offsetHeight}px + 1rem)`;
                    }
                }
            }
        });

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

    <div class="main-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mainWrapper}>
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
        padding: 0;
        margin: 0;
    }
</style>






