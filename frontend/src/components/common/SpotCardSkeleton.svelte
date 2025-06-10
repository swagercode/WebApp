<script lang="ts">
    const { delay = 0 } = $props();
</script>

<div 
    class="skeleton-container" 
    style="--delay: {delay}ms;"
>
    <div class="skeleton-card">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-location"></div>
            <div class="skeleton-description"></div>
            <div class="skeleton-rating"></div>
        </div>
    </div>
</div>

<style>
    .skeleton-container {
        opacity: 0;
        animation: skeletonFadeIn 0.4s ease-out forwards;
        animation-delay: var(--delay);
    }

    .skeleton-card {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 200px;
    }

    .skeleton-image {
        height: 200px;
        background: #e9ecef;
        border-radius: 12px;
    }

    .skeleton-content {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        flex: 1;
    }

    .skeleton-title {
        height: 24px;
        background: #e9ecef;
        border-radius: 6px;
        width: 70%;
    }

    .skeleton-location {
        height: 18px;
        background: #e9ecef;
        border-radius: 6px;
        width: 50%;
    }

    .skeleton-description {
        height: 16px;
        background: #e9ecef;
        border-radius: 6px;
        width: 90%;
    }

    .skeleton-rating {
        height: 20px;
        background: #e9ecef;
        border-radius: 6px;
        width: 60%;
        margin-top: auto;
    }

    @keyframes skeletonFadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }




    @media (prefers-reduced-motion: reduce) {
        .skeleton-container {
            animation: simpleFadeIn 0.3s ease-out forwards;
            animation-delay: calc(var(--delay) * 0.3);
        }
        
        .skeleton-image,
        .skeleton-title,
        .skeleton-location,
        .skeleton-description,
        .skeleton-rating {
            background: #e9ecef;
        }
        
        @keyframes simpleFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    }
</style>
