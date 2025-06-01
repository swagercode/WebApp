<script lang="ts">
    import SpotsMap from '../../components/maps/SpotsMap.svelte';
    import Homenav from '../../components/common/Homenav.svelte';

    import { onMount } from 'svelte';
    let header: Homenav;
    let offsetHeight = $state(0);
    let mapWrapper: HTMLElement;

    onMount(() => {
        requestAnimationFrame(() => {
            if (header) {
                const height = header.getOffsetHeight();
                if (height !== null && height !== undefined) {
                    offsetHeight = height;
                    if (mapWrapper) {
                        mapWrapper.style.marginTop = `calc(${offsetHeight}px + 1rem)`;
                    }
                }
                
                window.addEventListener('resize', () => {
                    const height = header.getOffsetHeight();
                    if (height !== null && height !== undefined) {
                        offsetHeight = height;
                        if (mapWrapper) {
                            mapWrapper.style.marginTop = `calc(${offsetHeight}px + 1rem)`;
                        }
                    }
                });
            }
        });
    });
</script>

<div class="page-wrapper">
    <div class="head-wrapper">
        <Homenav transition={false} bind:this={header}/>
    </div>

    <div class="map-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mapWrapper}>
        <SpotsMap />
    </div>
</div>

<style>
    @font-face {
        font-family: 'Gotham';
        src: url('/Gotham Font Family/Gotham-font-family/Gotham/Gotham-Black.otf') format('opentype');
        font-weight: 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'Gotham';
        src: url('/Gotham Font Family/Gotham-font-family/Gotham/Gotham-Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
    }
    
    :global(:root) {
        font-family: 'Gotham';
        --font-clr: #7A7A7A;
        --font-weight: 550;

        --primary-clr: #EF934B;
        --brighter-primary-clr: #ff903c;
        --faded-primary-clr: #edd3be;
        --hover-clr: #F5F5F5;
        --open-clr: #628F66;
        --closed-clr: #C60000;
        --gray-button-clr: #F2F2F2;
        --gray-button-hover-clr: #EBEBEB;

        --rating-clr: #F0C0A2;

        --bg-clr: #ffffff;

        --carousel-width: 100%;
        --carousel-height: 100%;
        --carousel-border: 1px solid black;

        --button-size: 3rem;

        --box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

        margin: 0;
        padding: 0;

    }

    :global(body) {
        margin: 0;
        padding: 0;
    }

    :global(.sr-only) {
        display: none;
    }

    .page-wrapper {
        height: 100dvh;
        width: 100dvw;
        display: flex;
        flex-direction: column;
    }

    .head-wrapper {
        top: 0;
        width: 100%;
    }

    .map-wrapper {
        width: 100%;
        height: 100%;
    }
</style>

