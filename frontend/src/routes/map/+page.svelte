<script lang="ts">  
    import Homenav from "../../components/common/Homenav.svelte";
    import SpotsMap from "../../components/maps/SpotsMap.svelte";
    import { onMount } from "svelte";
    let header: Homenav;

    onMount(() => {
        header.setCarouselOpen(false);
    });

</script>




<div>
    <div class="header-container">
        <Homenav bind:this={header}/>
    </div>

    <div class="map-container"> 
        <SpotsMap />
    </div>
</div>


<style>
    .header-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }

    .map-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>