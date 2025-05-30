<script>
    import { onMount } from "svelte";

    onMount(() => {
        console.log("Search mounted");
    });
</script>

<form action="/search" method="get" class="search-form">
    <div class="search-bar">
        <input type="text" placeholder="Search for a space" />
    </div>
</form>

<style>

    .search-bar {
        box-sizing: border-box;
        width: 100%;
        height: 3.5rem;
        border-radius: 2rem;
        padding: .5rem .5rem .5rem .5rem;
        margin: 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .search-bar input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        font-size: 1.1rem;
    }
</style>