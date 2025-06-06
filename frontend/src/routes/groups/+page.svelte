<script lang="ts">
    import Homenav from '../../components/common/Homenav.svelte';
    import { onMount } from 'svelte';


    let groups = $state([
        { name: 'Group 1' },
        { name: 'Group 2' },
        { name: 'Group 3' },
    ]);

    let header: Homenav;
    let lastScrollY = $state(0);
    let offsetHeight = $state(0);
    let mainWrapper: HTMLElement;
    let headerWrapper: HTMLElement;

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
                header.toggleActive();
            }
            lastScrollY = window.scrollY;
        });
    });

</script>

<div class="page-wrapper">
    <div class="head-wrapper" bind:this={headerWrapper}>
        <Homenav bind:this={header}/>
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .head-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>