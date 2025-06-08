<script lang="ts">
    import SpotsMap from '../../components/maps/SpotsMap.svelte';

</script>


    <div class="map-wrapper">
        <SpotsMap />
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

