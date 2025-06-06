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
        <Homenav transition={true} bind:this={header}/>
    </div>

    <div class="map-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mapWrapper}>
        <SpotsMap />
    </div>
</div>

<style>
 
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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 98%;
        height: 98%;
        margin: 1rem;
        border-radius: 1rem;
    }
</style>

