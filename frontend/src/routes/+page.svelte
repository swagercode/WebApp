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
            image: "https://images.squarespace-cdn.com/content/v1/55049669e4b030d1c7f84cad/1551055694822-D8GGVSKED06I9SB062MC/North+Park+exterior",
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "study-lounge",
            name: "Study Lounge",
            location: "456 University Ave",
            image: "https://studios.imgix.net/img/gallery-images/assets/uploads/UCSD_Canyon_Vista_Half_Width_Study_Lounge.jpg?q=85",
            description: "Modern study space with fast WiFi and quiet atmosphere.",
            distance: "8 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "green-bean-coffee",
            name: "Green Bean Coffee",
            location: "789 Oak Street",
            image: "https://cdn.shopify.com/s/files/1/0909/2906/files/PXL_20230609_193736155.jpg?v=1740439409",
            description: "Organic coffee shop with outdoor seating and study-friendly environment.",
            distance: "12 minute walk",
            openStatus: false,
            rating: rating
        },
        {
            id: "campus-library",
            name: "Campus Library",
            location: "University Campus",
            image: "https://blogs.chapman.edu/wp-content/uploads/sites/37/2022/11/20221020_084122.jpg",
            description: "Quiet library with individual study rooms and group areas.",
            distance: "3 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "bookworm-cafe",
            name: "Bookworm Cafe",
            location: "321 College Blvd",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/09/84/bf/photo3jpg.jpg?w=900&h=500&s=1",
            description: "Literary-themed cafe with comfortable reading nooks.",
            distance: "15 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "tech-hub",
            name: "Tech Hub",
            location: "654 Innovation Drive",
            image: "https://ml5enisp4q1t.i.optimole.com/w:1600/h:899/q:mauto/f:best/https://interiorarchitects.com/wp-content/uploads/2022/06/MasterCard-NYC_02.jpg",
            description: "Co-working space with high-speed internet and coding-friendly atmosphere.",
            distance: "20 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "darkhorse-cafe",
            name: "DarkHorse Cafe",
            location: "123 Main St, College Town",
            image: "https://images.squarespace-cdn.com/content/v1/55049669e4b030d1c7f84cad/1551055694822-D8GGVSKED06I9SB062MC/North+Park+exterior",
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "study-lounge",
            name: "Study Lounge",
            location: "456 University Ave",
            image: "https://studios.imgix.net/img/gallery-images/assets/uploads/UCSD_Canyon_Vista_Half_Width_Study_Lounge.jpg?q=85",
            description: "Modern study space with fast WiFi and quiet atmosphere.",
            distance: "8 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "green-bean-coffee",
            name: "Green Bean Coffee",
            location: "789 Oak Street",
            image: "https://cdn.shopify.com/s/files/1/0909/2906/files/PXL_20230609_193736155.jpg?v=1740439409",
            description: "Organic coffee shop with outdoor seating and study-friendly environment.",
            distance: "12 minute walk",
            openStatus: false,
            rating: rating
        },
        {
            id: "campus-library",
            name: "Campus Library",
            location: "University Campus",
            image: "https://blogs.chapman.edu/wp-content/uploads/sites/37/2022/11/20221020_084122.jpg",
            description: "Quiet library with individual study rooms and group areas.",
            distance: "3 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "bookworm-cafe",
            name: "Bookworm Cafe",
            location: "321 College Blvd",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/09/84/bf/photo3jpg.jpg?w=900&h=500&s=1",
            description: "Literary-themed cafe with comfortable reading nooks.",
            distance: "15 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "tech-hub",
            name: "Tech Hub",
            location: "654 Innovation Drive",
            image: "https://ml5enisp4q1t.i.optimole.com/w:1600/h:899/q:mauto/f:best/https://interiorarchitects.com/wp-content/uploads/2022/06/MasterCard-NYC_02.jpg",
            description: "Co-working space with high-speed internet and coding-friendly atmosphere.",
            distance: "20 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "darkhorse-cafe",
            name: "DarkHorse Cafe",
            location: "123 Main St, College Town",
            image: "https://images.squarespace-cdn.com/content/v1/55049669e4b030d1c7f84cad/1551055694822-D8GGVSKED06I9SB062MC/North+Park+exterior",
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "study-lounge",
            name: "Study Lounge",
            location: "456 University Ave",
            image: "https://studios.imgix.net/img/gallery-images/assets/uploads/UCSD_Canyon_Vista_Half_Width_Study_Lounge.jpg?q=85",
            description: "Modern study space with fast WiFi and quiet atmosphere.",
            distance: "8 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "green-bean-coffee",
            name: "Green Bean Coffee",
            location: "789 Oak Street",
            image: "https://cdn.shopify.com/s/files/1/0909/2906/files/PXL_20230609_193736155.jpg?v=1740439409",
            description: "Organic coffee shop with outdoor seating and study-friendly environment.",
            distance: "12 minute walk",
            openStatus: false,
            rating: rating
        },
        {
            id: "campus-library",
            name: "Campus Library",
            location: "University Campus",
            image: "https://blogs.chapman.edu/wp-content/uploads/sites/37/2022/11/20221020_084122.jpg",
            description: "Quiet library with individual study rooms and group areas.",
            distance: "3 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "bookworm-cafe",
            name: "Bookworm Cafe",
            location: "321 College Blvd",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/09/84/bf/photo3jpg.jpg?w=900&h=500&s=1",
            description: "Literary-themed cafe with comfortable reading nooks.",
            distance: "15 minute walk",
            openStatus: true,
            rating: rating
        },
        {
            id: "tech-hub",
            name: "Tech Hub",
            location: "654 Innovation Drive",
            image: "https://ml5enisp4q1t.i.optimole.com/w:1600/h:899/q:mauto/f:best/https://interiorarchitects.com/wp-content/uploads/2022/06/MasterCard-NYC_02.jpg",
            description: "Co-working space with high-speed internet and coding-friendly atmosphere.",
            distance: "20 minute walk",
            openStatus: true,
            rating: rating
        }
 
    ]






</script>

<div class="main-wrapper">
    <div class="content-wrapper" >
        {#each spotsArray as spot}
            <SpotComponent {spot} />
        {/each}
    </div>
</div>

<style>
    .main-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content-wrapper {
        width: 85%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 1fr;
        gap: 3rem;
        justify-content: center;
    }

</style>
    


