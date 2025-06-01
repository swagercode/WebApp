<script lang="ts"> 
    import { scale } from 'svelte/transition';

    const gentleBack = (t: number) => {
        const s = 1.3;
        return --t * t * ((s + 1) * t + s) + 1;
    };
</script>


<div class="wrapper">
    <button class="button" transition:scale={{duration: 800, easing: gentleBack}}>
    </button>
    <button class="button" transition:scale={{duration: 800, easing: gentleBack}}>
    </button>
    <button class="button" transition:scale={{duration: 800, easing: gentleBack}}>
    </button>
</div>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        gap: 2.5rem;    
    }

    .button {
        width: 4rem;
        aspect-ratio: 1/1;
        background-color: var(--bg-clr);
        border: transparent;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

</style>

