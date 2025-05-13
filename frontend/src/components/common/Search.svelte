<script>
    import { onMount } from "svelte";

    onMount(() => {
        console.log("Search mounted");
    });
</script>

<form action="/search" method="get">
    <div class="search-bar">
        <input type="text" placeholder="Search for a space" />
    </div>
</form>

<style>
    .search-bar {
        width: 100%;
        height: auto;
        border-radius: 1.1rem;
        border: 1px solid #000000;
        padding: 0.5rem;
        margin: 0 auto;
    }

    .search-bar input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
    }
</style>