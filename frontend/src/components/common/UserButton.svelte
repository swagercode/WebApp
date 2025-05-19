<script lang="ts">
    import { onMount, getContext } from "svelte";
    import type { User } from "../../components/types";

    let { open = $bindable() } = $props();

    const user: User = getContext("user");

    function handleClickOutside(event: MouseEvent) {
        const menu = document.querySelector('.user-nav');
        const button = document.querySelector('.user-button');
        if (
            menu && !menu.contains(event.target as Node) &&
            button && !button.contains(event.target as Node)
        ) {
            open = false;
        }
    }

    $effect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    });
    
</script>


<button class="user-button" onclick={() => {open = !open}}>
    <span class="sr-only">Menu</span>
    <div class="ham-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="img-wrapper">
        <img src={user.profilePicture} alt="profile" />
    </div>
</button>

<nav class="user-nav" data-visible={open ? "open" : ""}>
    <div class="close-button">
        <button class="close-button-button" onclick={() => {open = !open}}>
            <span class="sr-only">Close</span>

            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 460.775 460.775" xml:space="preserve">
                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                    c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                    c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                    c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                    l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                    c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
            </svg>
        </button>
    </div>
    <div class="nav-button">
        <a href="/">Home</a>
    </div>
    <div class="nav-button">
        <a href="/maps">Maps</a>
    </div>
    <div class="nav-button">
        <a href="/saved">Saved</a>
    </div>
    <div class="nav-button">
        <a href="/profile">Profile</a>
    </div>
</nav>

<style>

    :global(:root) {
        --nav-bg-clr: #ffffff;
    }

    .user-button {
        width: clamp(2rem, 6rem, 10rem);
        height: clamp(1rem, 4rem, 5rem);
        border-radius: 3rem;
        border: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease-in-out;
    }

    .user-button:hover {
        background-color: var(--hover-clr);
        width: calc(width + 2rem);
        height: calc(height + 2rem);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .img-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .user-button img {
        height: 55%;
        border-radius: 50%;
        aspect-ratio: 1/1;
    }

    .ham-menu {
        padding-inline-start: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: clamp(.1rem, 2rem, 3rem);
        gap: .3rem;
    }


    .ham-menu span {
        height: .2rem;
        display: block;
        width: 100%;
        background-color: var(--font-clr);
        border-radius: 1rem;
    }

    .user-nav {
        position: fixed;
        inset: 0 0 50% 50%;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-evenly;
        align-items: center;
        background-color: #ffffff;
        
        border-radius: 2rem;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    }

    .user-nav[data-visible="open"] {
        transform: translateX(0);
    }

    .nav-button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close-button {
        inset: 1rem 0 0 1rem;
        background: transparent;
        border: none;
    }

    .close-button-button {
        background: transparent;
        border: none;
    }

    .close-button-button:hover > svg{
        fill: var(--hover-clr);
    }

    .close-button svg {
        width: 1rem;
        height: 1rem;
    }

    .nav-button a {
        text-decoration: none;
        color: var(--font-clr);
    }

</style>
