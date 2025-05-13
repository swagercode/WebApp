<script>
    import { onMount } from "svelte";
    import Carousel from "./Carousel.svelte";
    import Search from "./Search.svelte";
    import UserButton from "./UserButton.svelte";

    let { open = $bindable() } = $props();

    onMount(() => {
        console.log("Navbar mounted");
    });
</script>


<nav>
    <div class="top-wrapper">
        <div class="logo-wrapper" aria-hidden="true">
            <img src="/stot.png" alt="logo" />
        </div>
        <div class="middle-wrapper">
            <div class="search-wrapper">
                <Search />
            </div>
        </div>
        <div class="user-wrapper">
            <UserButton open={open} />
        </div>
    </div>

    <div class="carousel-wrapper">
        <Carousel />
    </div>
</nav>

<style>

    nav {
        width: 100%;
        padding-block: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .top-wrapper {
        width: 95%;
        padding-block-end: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .logo-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min(20%, 10rem);
    }

    .logo-wrapper img {
        width: 100%;
        object-fit: contain;
    }

    .middle-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .search-wrapper {
        height: 100%;
        width: clamp(10rem, 50%, 20rem);

    }

    .carousel-wrapper {
        width: 100%;
        height: 100%;
        justify-content: center;
    }

    
    

</style>