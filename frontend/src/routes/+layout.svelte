<script lang="ts">
    import Homenav from '../components/common/Homenav.svelte';


    let open = $state(false);
    function toggleOpen() {
        open = !open;
        console.log(open);
    }
</script>

<div class="layout">
    <!-- TODO: not working. idk how sync the open state between components -->
    <div class="head-wrapper">
        <Homenav open={open} />
    </div>
</div>

<style>
    :global(:root) {
        font-family: Arial, Helvetica;
        --font-clr: #7A7A7A;
        --font-weight: 550;

        --active-clr: red;
        --selected-clr: #E19658;
        --hover-clr: #F5F5F5;

        --bg-clr: #000000;

        --carousel-width: 100%;
        --carousel-height: 100%;
        --carousel-border: 1px solid black;

        --button-size: 3rem;

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

    .layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 100dvh;
        width: 100dvw;
    }

    .head-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }


    .haze-wrapper {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: none;
        inset: 0;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
        background-color: #000000;
        z-index: 99;
        pointer-events: none;
    }

    .haze-wrapper[data-visible="open"] {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 99;
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;
        background-color: #000000;
        pointer-events: auto;
    }

</style>
    

