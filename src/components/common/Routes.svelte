<script lang="ts"> 
    import { scale } from 'svelte/transition';
    import { page } from '$app/state';

    let wrapper: HTMLElement;

    let { isMobile = false } = $props();

    const gentleBack = (t: number) => {
        const s = 1.2;
        return --t * t * ((s + 1) * t + s) + 1;
    };

    const names = ["SPOTS", "GROUPS", "HOUSING", "TUTORING"];
    const paths = ["/", "/groups", "/housing", "/tutoring"];

    const mobileNames = ["SPOTS", "GROUPS", "HOUSING", "TUTORING", "MORE"];
    const mobilePaths = ["/", "/groups", "/housing", "/tutoring", "/more"];
    
</script>

{#if !isMobile}
<div class="wrapper desktop" bind:this={wrapper}>
    {#each names as name, index}
    <a href={paths[index]} transition:scale|global={{duration: 500, easing: gentleBack}}>
        <img src={`/nav-icons/${name.toLowerCase()}-icon.png`} alt={name} />
        {#if page.url.pathname === paths[index]}
            <h1 class="button-text" style="color: var(--font-clr-dark);">{name}</h1>
            <hr class="selected-line" />
        {:else}
            <h1 class="button-text">{name}</h1>
        {/if}
    </a>
    {/each}
</div>
{/if}

{#if isMobile}
<div class="wrapper mobile">
    {#each mobileNames as name, index}
    <a href={mobilePaths[index]}>
        <img src={`/nav-icons/${name.toLowerCase()}-icon.png`} alt={name.toLowerCase()} />
        <h1>{name}</h1>
    </a>
    {/each}
</div>
{/if}

<style>
    .wrapper.desktop {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 4.75rem;
    }

    .wrapper.desktop a {
        width: 3.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: transparent;
        cursor: pointer;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    .wrapper.desktop a img {
        height: 2.5rem;
        object-fit: contain;
        padding: 0;
        margin: 0;
    }

    .wrapper.desktop a:nth-child(1) img {
        height: 3rem;
    }

    .wrapper.desktop a h1 {
        font-size: 1.1rem;
        font-weight: 400;
        color: var(--font-clr);
        padding: 0;
        margin: 0;
    }

    .selected-line {
        width: 125%;
        height: 1px;
        background-color: var(--font-clr-dark);
        margin: 0;
        padding: 0;
        view-transition-name: top-routes-selected-line;
    }

    .wrapper.mobile {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0;
    }

    .wrapper.mobile a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: calc(.1rem + 1vw);
        color: var(--font-clr);
        text-align: center;
    }

    .wrapper.mobile a h1 {
        margin: 0;
        padding: 0;
    }

    .wrapper.mobile a img {
        width: 90%;
        height: 90%;
        aspect-ratio: 1/1;
    }

</style>

