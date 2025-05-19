<script>
    import { onMount } from "svelte";
    import Carousel from "./common/Carousel.svelte";
    import Search from "./common/Search.svelte";
    import UserButton from "./common/UserButton.svelte";

    let { open = $bindable() } = $props();

    onMount(() => {
        console.log("Navbar mounted");
    });
</script>

<div class="wrapper">
    <nav>
        <div class="top-wrapper">
            <div class="logo-wrapper" aria-hidden="true">
            <img src="/stot.png" alt="logo" />
        </div>
        <div class="middle-wrapper">
           <h1>
            Find your next <span>study spot</span>
            </h1>
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
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-clr);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    nav {
        width: 100%;
        padding-block: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--bg-clr);
    }

    .top-wrapper {
        width: 95%;
        padding-block-end: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .logo-wrapper, .user-wrapper {
        flex: 1 1 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 0;
    }

    .logo-wrapper img {
        width: 70%;
        max-width: 7rem;
        object-fit: contain;
    }

    .middle-wrapper {
        flex: 2 1 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        min-width: 0;
    }

    .search-wrapper {
        width: 100%;
        height: 100%;
    }

    .carousel-wrapper {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 784px) {
            width: 100%;
        }
    }

    h1 {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        color: var(--font-clr);
    }

    h1 span {
        color: var(--selected-clr);
    }


</style>