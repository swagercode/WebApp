<script lang="ts">
    import SpotComponent from '../components/spots/searchGallery/SpotComponent.svelte';
    import SpotCardSkeleton from '../components/common/SpotCardSkeleton.svelte';
    import type { Spot, Rating } from '../components/types';
    import type { PageData } from './$types';

    const { data }: { data: PageData } = $props();
    
    let isLoaded = $state(false);
    
    const fallbackRating: Rating = {
        overall: 3.2,
        atmosphere: 3,
        comfort: 4,
        quiet: 2,
        seating: 5
    };

    const fallbackSpots: Spot[] = [
        {
            id: "darkhorse-cafe",
            name: "DarkHorse Cafe",
            location: "123 Main St, College Town",
            images: ["https://images.squarespace-cdn.com/content/v1/55049669e4b030d1c7f84cad/1551055694822-D8GGVSKED06I9SB062MC/North+Park+exterior"],
            description: "A cozy cafe perfect for studying with comfortable seating and great coffee.",
            distance: "5 minute walk",
            openStatus: true,
            rating: fallbackRating
        },
        {
            id: "study-lounge",
            name: "Study Lounge",
            location: "456 University Ave",
            images: ["https://studios.imgix.net/img/gallery-images/assets/uploads/UCSD_Canyon_Vista_Half_Width_Study_Lounge.jpg?q=85"],
            description: "Modern study space with fast WiFi and quiet atmosphere.",
            distance: "8 minute walk",
            openStatus: true,
            rating: fallbackRating
        },
        {
            id: "green-bean-coffee",
            name: "Green Bean Coffee",
            location: "789 Oak Street",
            images: ["https://cdn.shopify.com/s/files/1/0909/2906/files/PXL_20230609_193736155.jpg?v=1740439409"],
            description: "Organic coffee shop with outdoor seating and study-friendly environment.",
            distance: "12 minute walk",
            openStatus: false,
            rating: fallbackRating
        },
        {
            id: "campus-library",
            name: "Campus Library",
            location: "University Campus",
            images: ["https://blogs.chapman.edu/wp-content/uploads/sites/37/2022/11/20221020_084122.jpg"],
            description: "Quiet library with individual study rooms and group areas.",
            distance: "3 minute walk",
            openStatus: true,
            rating: fallbackRating
        },
        {
            id: "bookworm-cafe",
            name: "Bookworm Cafe",
            location: "321 College Blvd",
            images: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/09/84/bf/photo3jpg.jpg?w=900&h=500&s=1"],
            description: "Literary-themed cafe with comfortable reading nooks.",
            distance: "15 minute walk",
            openStatus: true,
            rating: fallbackRating
        },
        {
            id: "tech-hub",
            name: "Tech Hub",
            location: "654 Innovation Drive",
            images: ["https://ml5enisp4q1t.i.optimole.com/w:1600/h:899/q:mauto/f:best/https://interiorarchitects.com/wp-content/uploads/2022/06/MasterCard-NYC_02.jpg"],
            description: "Co-working space with high-speed internet and coding-friendly atmosphere.",
            distance: "20 minute walk",
            openStatus: true,
            rating: fallbackRating
        }
    ];

    const spots = data.spots?.length > 0 ? data.spots : fallbackSpots;

    $effect(() => {
        const imageUrls = spots.map((spot: Spot) => spot.images[0]).filter(Boolean);
        
        Promise.all(imageUrls.map((url: string) => 
            new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = img.onerror = () => resolve();
                img.src = url;
            })
        )).then(() => {
            isLoaded = true;
        });
    });

</script>

<div class="main-wrapper">
        <div class="content-wrapper">
        {#if !isLoaded}
            {#each Array(spots.length) as _, index}
                <SpotCardSkeleton delay={index * 50} />
            {/each}
        {:else}
            {#each spots as spot, index}
                <div 
                    class="spot-container" 
                    style="--delay: {(Math.floor(index / 3) * 50) + ((index % 3) * 100)}ms; --index: {index};"
                >
                    <SpotComponent {spot} />
                </div>
            {/each}
        {/if}
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

    .spot-container {
        opacity: 0;
        animation: cascadeIn 0.8s ease-out forwards;
        animation-delay: var(--delay);
        transition: transform 0.3s ease;
    }

    .spot-container:hover {
        transform: translateY(-2px) scale(1.02);
    }

    @keyframes cascadeIn {
        0% { opacity: 0; }
        60% { opacity: 0.8; }
        100% { opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
        .spot-container {
            animation: simpleFadeIn 0.5s ease-out forwards;
            animation-delay: calc(var(--delay) * 0.3);
        }
        
        @keyframes simpleFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    }

    @media (max-width: 768px) {
        .spot-container {
            animation-delay: calc(var(--delay) * 0.5);
        }
    }


</style>
    


