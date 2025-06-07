<script lang="ts">
    let recentSearches = $state([
        {
            name: "Better Buzz",
            icon: "☕",
            time: "12 mins away",
            rating: 4.3
        }
    ]);
    let menuRef: HTMLDivElement | null;

</script>

<div class="search-menu-container" bind:this={menuRef} tabindex="-1">
    <div class="search-menu-header">
        <span class="search-menu-header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#FFA53B" stroke-width="2"/><path d="M12 6v6l4 2" stroke="#FFA53B" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
        <div class="search-menu-header-text">
            <div class="search-menu-title">Recent searches</div>
            <div class="search-menu-desc">Find your previous <span class="highlight">study spots</span></div>
        </div>
    </div>
    <hr class="search-menu-divider" />
    <div class="search-menu-list">
        {#each recentSearches as search}
            <div class="search-menu-item">
                <span class="search-menu-item-icon">{search.icon}</span>
                <div class="search-menu-item-info">
                    <div class="search-menu-item-title">{search.name}</div>
                    <div class="search-menu-item-meta">{search.time} <span class="star">★</span>{search.rating}</div>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
.search-menu-container {
    width: 100%;
    height: 100%;
    background: var(--bg-clr);
    border-radius: 2rem;
    box-shadow: 0 8px 24px -4px rgba(0,0,0,0.14);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}
.search-menu-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.search-menu-header-icon {
    background: #FFF6E6;
    border-radius: 1.2rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-menu-header-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.search-menu-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--font-clr, #222);
}
.search-menu-desc {
    font-size: 0.95rem;
    color: var(--font-clr-light, #888);
}
.highlight {
    color: #FFA53B;
}
.search-menu-divider {
    border: none;
    border-top: 1px solid #F2F2F2;
    margin: 0;
}
.search-menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}
.search-menu-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 0.5rem;
    border-radius: 1rem;
    transition: background 0.15s;
    cursor: pointer;
}
.search-menu-item:hover {
    background: #FAFAFA;
}
.search-menu-item-icon {
    font-size: 1.5rem;
    background: #F2F2F2;
    border-radius: 0.7rem;
    padding: 0.4rem 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-menu-item-info {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}
.search-menu-item-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--font-clr, #222);
}
.search-menu-item-meta {
    font-size: 0.92rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}
.star {
    color: #FFA53B;
    font-size: 1.1em;
    margin-right: 0.1em;
}
</style>
