
<script lang="ts">
    import Homenav from '../components/common/Homenav.svelte';
    import SpotComponent from '../components/spots/SpotComponent.svelte';
    import type { Spot, Rating } from '../components/types';
    import { onMount } from 'svelte';

    let rating: Rating = {
        overall: 3.2,
        atmosphere: 3,
        comfort: 4,
        quiet: 2,
        seating: 5
    }

    let spotsArray: Spot[] = [
        {
            id: "darkhorse-cafe",
            name: "DarkHorse Cafe",
            location: "123 Main St, College Town",
            image: "https://placehold.co/400",
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "study-lounge",
            name: "Study Lounge",
            location: "456 University Ave",
            image: "https://placehold.co/400/0066CC/FFFFFF",
            description: "Modern study space with fast WiFi and quiet atmosphere.",
            distance: "8 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "green-bean-coffee",
            name: "Green Bean Coffee",
            location: "789 Oak Street",
            image: "https://placehold.co/400/CC6600/FFFFFF",
            description: "Organic coffee shop with outdoor seating and study-friendly environment.",
            distance: "12 minute walk",
            openStatus: false,
            rating: rating
        },
        {
            id: "campus-library",
            name: "Campus Library",
            location: "University Campus",
            image: "https://placehold.co/400/009966/FFFFFF",
            description: "Quiet library with individual study rooms and group areas.",
            distance: "3 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "bookworm-cafe",
            name: "Bookworm Cafe",
            location: "321 College Blvd",
            image: "https://placehold.co/400/9900CC/FFFFFF",
            description: "Literary-themed cafe with comfortable reading nooks.",
            distance: "15 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "tech-hub",
            name: "Tech Hub",
            location: "654 Innovation Drive",
            image: "https://placehold.co/400/FF6600/FFFFFF",
            description: "Co-working space with high-speed internet and coding-friendly atmosphere.",
            distance: "20 minute walk",
            openStatus: true,
            rating: rating
        }
    ]

    let header: Homenav;
    let lastScrollY = $state(0);
    let offsetHeight = $state(0);
    let mainWrapper: HTMLElement;
    onMount(() => {
        window.addEventListener('resize', () => {
            offsetHeight = header.getOffsetHeight();
            mainWrapper.style.margin = `calc(${offsetHeight}px + 1rem)`;
        });

        window.addEventListener('scroll', () => {
            if ((window.scrollY === 0 && lastScrollY !== 0) || (window.scrollY !== 0 && lastScrollY === 0)) {
                header.toggleCarousel();
            }
            lastScrollY = window.scrollY;
        });
        offsetHeight = header.getOffsetHeight();
    });




</script>

<div class="layout">
    <div class="head-wrapper">
        <Homenav bind:this={header}/>
    </div>

    <div class="main-wrapper" style="margin-top: calc({offsetHeight}px + 1rem);" bind:this={mainWrapper}>
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

        --primary-clr: #EF934B;
        --brighter-primary-clr: #ff903c;
        --faded-primary-clr: #edd3be;
        --hover-clr: #F5F5F5;
        --open-clr: #628F66;
        --closed-clr: #C60000;
        --gray-button-clr: #F2F2F2;
        --gray-button-hover-clr: #EBEBEB;

        --rating-clr: #F0C0A2;

        --bg-clr: #ffffff;

        --carousel-width: 100%;
        --carousel-height: 100%;
        --carousel-border: 1px solid black;

        --button-size: 3rem;

        --box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

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
    


