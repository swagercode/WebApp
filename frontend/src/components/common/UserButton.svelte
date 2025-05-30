<script lang="ts">
    import { motionValue } from 'svelte-motion';
    import { goto } from "$app/navigation";
    import { user } from "../../lib/index.svelte";

    let open = $state(false);
    let morph = motionValue(0);

    export function toggleOpen() {
        open = !open;
        morph.set(open ? 1 : 0);
    }

    function handleClickOutside(event: MouseEvent) {
        const menu = document.querySelector('.morph-menu');
        const button = document.querySelector('.user-button');
        if (
            menu && !menu.contains(event.target as Node) &&
            button && !button.contains(event.target as Node)
        ) {
            open = false;
            morph.set(0);
        }
    }

    $effect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    });

    function handleHome() {
        goto('/');
    }
    function handleLogin() {
        // TODO: Implement login logic or redirect
        alert('Login clicked');
    }
    function handleLogout() {
        // TODO: Implement logout logic
        alert('Logout clicked');
    }
    function handleMap() {
        goto('/map');
    }
    function handleFavorites() {
        // TODO: Implement favorites logic
        alert('Favorites clicked');
    }
    function handleProfile() {
        // TODO: Implement profile logic
        alert('Profile clicked');
    }
</script>

<div class="morph-menu-wrapper">
    <button class="user-button morph-btn" aria-haspopup="true" aria-expanded={open} onclick={toggleOpen} tabindex="0">
        <span class="sr-only">Menu</span>
        <div class="ham-x-menu" aria-hidden="true">
            <span class:open={open}></span>
            <span class:open={open}></span>
            <span class:open={open}></span>
        </div>
        {#if user}
            <div class="img-wrapper" style="opacity: {open ? 0 : 1}; transform: scale({open ? 0.5 : 1}); transition: opacity 0.2s, transform 0.2s;">
                <img src={user?.profilePicture || '/default-profile.png'} alt="profile" />
            </div>
        {/if}
    </button>
    {#if open}
        <div
            class="morph-menu"
            
            tabindex="-1"
        >
            <div class="menu-content">
                <div class="menu-items">
                    <button class="dropdown-btn" onclick={handleHome}>Home</button>
                    {#if user}
                        <button class="dropdown-btn" onclick={handleMap}>Map</button>
                        <button class="dropdown-btn" onclick={handleFavorites}>Favorites</button>
                        <button class="dropdown-btn" onclick={handleProfile}>Profile</button>
                        <button class="dropdown-btn" onclick={handleLogout}>Logout</button>
                    {:else}
                        <button class="dropdown-btn" onclick={handleLogin}>Login</button>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
.morph-menu-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    height: 3rem;
    width: 5rem;
}
.morph-menu {
    overflow: hidden;
    width: 14rem;
    border-radius: 1.2rem;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.08);
    position: absolute;
    top: 0;
    right: 0;
    background: var(--bg-clr);
    transition: width 0.35s cubic-bezier(.4,2,.6,1), height 0.35s cubic-bezier(.4,2,.6,1), border-radius 0.35s cubic-bezier(.4,2,.6,1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}

.user-button.morph-btn {
    border: none;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 0;
    margin: 0;
    outline: none;
    width: 7rem;
    height: 3rem;
    position: relative;
    background: var(--gray-button-clr);
    cursor: pointer;
}
.user-button.morph-btn:hover {
    background: var(--gray-button-hover-clr);
    box-shadow: var(--box-shadow);
}

.img-wrapper {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    margin-left: 0.5rem;
    transition: opacity 0.2s, transform 0.2s;
}
.user-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}
.ham-x-menu {
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 12;
    margin-right: 0.2rem;
}
.ham-x-menu span {
    display: block;
    height: 0.15rem;
    width: 100%;
    background: var(--font-clr);
    border-radius: 1rem;
    margin: 0.13rem 0;
    transition: all 0.25s cubic-bezier(.4,0,.2,1);
}
.ham-x-menu span.open:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}
.ham-x-menu span.open:nth-child(2) {
    opacity: 0;
}
.ham-x-menu span.open:nth-child(3) {
    transform: rotate(-45deg) translate(3px, -3px);
}
.menu-content {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    overflow: hidden;
}
.menu-items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-top: 0.5rem;
    overflow: hidden;
}
.dropdown-btn {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 1rem;
    color: var(--font-clr, #333);
    cursor: pointer;
    transition: background 0.2s;
    overflow: hidden;
}
.dropdown-btn:hover, .dropdown-btn:focus {
    background: #f5f5f5;
    outline: none;
}
</style>
