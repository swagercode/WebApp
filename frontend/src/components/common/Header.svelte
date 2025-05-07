<script lang="ts">
    import { page } from '$app/state';
</script>

<header class="header">
    <div class="logo">
        <img src="/StudySpotLogo2.svg" alt="StudySpot Logo" />
    </div>
    <nav class="navigation">
    
        <a href="/" aria-current={page.url.pathname === '/' ? 'page' : undefined}>Home</a>
        <a href="/map" aria-current={page.url.pathname === '/map' ? 'page' : undefined}>Map</a>
        <a href="/favorites" aria-current={page.url.pathname === '/favorites' ? 'page' : undefined}>Favorites</a>
    </nav>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo img {
        width: 10rem;
        
    }

    .navigation {
        display: flex;
        gap: 1rem;
        padding: 1rem;
    }

    .navigation a {
        color: #F0965B;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        font-weight: 500;
    }

    .navigation a:hover {
        background-color: #F6C19D;
        color: white;
        transform: translateY(-0.1rem);
    }

    .navigation a[aria-current="page"] {
        background-color: #F0965B;
        color: white;
    }
</style>