<script lang="ts">
    import SpotsMap from "../../../components/maps/SpotsMap.svelte";
    import Homenav from "../../../components/common/Homenav.svelte";

    let header: Homenav;
    let offsetHeight = $state(0);
    let mainWrapper: HTMLElement;
    
</script>

<div class="layout">
    <div class="head-wrapper">
        <Homenav bind:this={header}/>
    </div>

    <div class="main-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mainWrapper}>
        <SpotsMap />
    </div>
</div>
