<script lang="ts">
    import Homenav from '../components/common/Homenav.svelte';
    import SpotComponent from '../components/spots/SpotComponent.svelte';
    import type { Spot, Rating, User } from '../components/types';
    import { onMount, setContext } from 'svelte';

    let rating: Rating = {
        overall: 3.2,
        atmosphere: 3,
        comfort: 4,
        openLate: 2,
        seating: 5
    }

    let user: User = {
        profilePicture: "profile.jpg",
        username: "John Doe",
        city: "New York"
    }

    setContext("user", user);

    let spotsArray: Spot[] = [
        {
            name: "Spot 1",
            location: "Location 1",
            image: "https://placehold.co/400",
            description: "Spot 1 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        },
        {
            name: "Spot 2",
            location: "Location 2",
            image: "https://placehold.co/400",
            description: "Spot 2 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        },
        {
            name: "Spot 3",
            location: "Location 3",
            image: "https://placehold.co/400",
            description: "Spot 3 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        },
        {
            name: "Spot 4",
            location: "Location 4",
            image: "https://placehold.co/400",
            description: "Spot 4 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        },
        {
            name: "Spot 5",
            location: "Location 5",
            image: "https://placehold.co/400",
            description: "Spot 5 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        },
        {
            name: "Spot 6",
            location: "Location 6",
            image: "https://placehold.co/400",
            description: "Spot 6 description",
            distance: "10 mins away",
            openStatus: true,
            rating: rating
        }
    ]

    let open = $state(false);
    let carouselOpen = $state(true);

    let headWrapper: HTMLDivElement | null = $state(null);
    let mainWrapper: HTMLDivElement | null = $state(null);

    function setMainPadding() {
        if (headWrapper && mainWrapper) {
            mainWrapper.style.paddingTop = headWrapper.offsetHeight + 'px';
        }
    }

    let following = $state(false);

    // function handleScroll() {
    //     const currentY = window.scrollY;
    //     if (currentY < lastScrollY && headWrapper != null && headWrapper.offsetHeight > ) {
    //         showHeader = true;
    //         hidable = true;
    //     } else if (currentY > lastScrollY) {
    //         showHeader = false;
    //         hidable = false;
    //     }
    //     lastScrollY = currentY;
    // }

    // onMount(() => {
    //     setMainPadding();
    //     const resizeObserver = new ResizeObserver(setMainPadding);
    //     if (headWrapper) resizeObserver.observe(headWrapper);
    //     window.addEventListener('resize', setMainPadding);
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         resizeObserver.disconnect();
    //         window.removeEventListener('resize', setMainPadding);
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // });

    onMount(() => {
        window.addEventListener('scroll', () => {
            if (headWrapper) {
                following = window.scrollY > headWrapper.offsetHeight;
            }
        });
        return () => {
            window.removeEventListener('scroll', () => {
                if (headWrapper) {
                    following = false;
                }
            });
        }
    });
</script>

<div class="layout">
    <div class="head-wrapper" bind:this={headWrapper} style="margin-block-start: {following ? window.scrollY - (headWrapper ? headWrapper.offsetHeight : 0) : 0}px;">
        <Homenav {open} {carouselOpen} />
    </div>

        <div class="main-wrapper" bind:this={mainWrapper}>
            {#each spotsArray as spot}
                <SpotComponent {spot} />
            {/each}
        </div>
</div>

<style>
    
    @font-face {
        font-family: 'Gotham';
        src: url('/Gotham Font Family/Gotham-font-family/Gotham/Gotham-Black.otf') format('opentype');
        font-weight: 900;
        font-style: normal;
    }
    @font-face {
        font-family: 'Gotham';
        src: url('/Gotham Font Family/Gotham-font-family/Gotham/Gotham-Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
    }
    
    :global(:root) {
        font-family: 'Gotham';
        --font-clr: #7A7A7A;
        --font-weight: 550;

        --active-clr: red;
        --selected-clr: #EF934B;
        --hover-clr: #F5F5F5;
        --open-clr: #628F66;
        --closed-clr: #C60000;

        --rating-clr: #F0C0A2;

        --bg-clr: #ffffff;

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
        height: 100dvh;
        width: 100dvw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .head-wrapper {
        top: 0;
        width: 100%;
    }

    .main-wrapper {
        width: 90%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 1fr;
        gap: 3rem;
        justify-content: center;
    }

</style>
    

