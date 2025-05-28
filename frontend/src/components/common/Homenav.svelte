<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import Carousel from "./Carousel.svelte";
    import Search from "./Search.svelte";
    import UserButton from "./UserButton.svelte";

    let carouselOpen = $state(true);
    let wrapper: HTMLElement;

    export function getOffsetHeight() {
        return wrapper.offsetHeight;
    }

    export function toggleCarousel() {
        carouselOpen = !carouselOpen;
    }

</script>

<nav class="wrapper" bind:this={wrapper}>
        <div class="top-wrapper" >
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
            <UserButton />
        </div>
    </div>

    <div class="carousel-wrapper" class:hidden={!carouselOpen}> 
            <Carousel />
   </div>
</nav>

<style>

    .wrapper {
        position: fixed;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--bg-clr);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        z-index: 1000;
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
        min-width: 0;
    }

    .search-wrapper {
        width: 80%;
        height: 100%;
    }

    .carousel-wrapper {
        max-height: 300px;
        opacity: 1;
        overflow: hidden;
        transition: 
            max-height 0.3s cubic-bezier(0.4,0,0.2,1),
            opacity 0.3s,
            transform 0.3s;
        width: 35%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel-wrapper.hidden {
        max-height: 0;
        opacity: 0;
        transform: translateY(-20px);
        pointer-events: none;
    }



    h1 {
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
        color: var(--font-clr);
        user-select: none;
    }

    h1 span {
        color: var(--primary-clr);
    }

    @media (max-width: 784px) {
        .logo-wrapper, .logo-wrapper img, .middle-wrapper > h1{
            display: none;
        }

        .middle-wrapper {
            flex: 1 1 0;
        }

        .top-wrapper {
            justify-content: space-between;
            width: 100%;
        }

        .search-wrapper {
            padding-inline-start: 1rem;
            padding-block-start: .5rem;
            width: 100%;
        }

        .user-wrapper {
            padding-inline-end: 1rem;
            justify-content: flex-end;
        }

        .carousel-wrapper {
            width: 100%;
        }

    }


</style>