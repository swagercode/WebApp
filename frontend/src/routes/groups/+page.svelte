<script lang="ts">
    import Homenav from '../../components/common/Homenav.svelte';
    import { onMount } from 'svelte';


    let groups = $state([
        { name: 'Group 1' },
        { name: 'Group 2' },
        { name: 'Group 3' },
    ]);

    let header: Homenav;
    let offsetHeight = $state(0);
    let mainWrapper: HTMLElement;

    onMount(() => {
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

    });

</script>

<div class="page-wrapper">
    <div class="head-wrapper">
        <Homenav transition={true} bind:this={header}/>
    </div>

    <div class="main-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mainWrapper}>
        {#each groups as group}
            <div class="group-card">
                <h2>{group.name}</h2>
            </div>
        {/each}
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

    .main-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>