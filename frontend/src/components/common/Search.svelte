<script>
    import { onMount } from "svelte";

    onMount(() => {
        console.log("Search mounted");
    });
</script>

<form action="/search" method="get" class="search-form">
    <div class="search-bar">
        <input type="text" placeholder="Search for a space" />
        <button class="search-bar-button" type="submit" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="none" stroke="#ffffff" stroke-width="36" stroke-linecap="round"
                d="m280,278a153,153 0 1,0-2,2l170,170m-91-117 110,110-26,26-110-110"/>
            </svg> 
        </button>
    </div>
</form>

<style>
    .search-bar {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 4.3rem;
        border-radius: 10rem;
        padding: .5rem .5rem .5rem .5rem;
        margin: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .search-bar-button {
        aspect-ratio: 1/1;
        width: 3rem;
        border: transparent;
        background-color: var(--primary-clr);
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-bar-button svg {
        width: 70%;
        height: 70%;
        display: block;
    }

    .search-bar input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        margin-inline-start: 1rem;
    }

</style>