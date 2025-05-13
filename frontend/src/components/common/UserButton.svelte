<script lang="ts">
    import { onMount } from "svelte";

    let { open = $bindable() } = $props();

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
    <div class="user-button-button">
        <img src="profile.png" alt="profile" />
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
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        border: 1px solid #000000;
        max-height: 2rem;
        cursor: pointer;
    }

    .user-button:hover {
        background-color: var(--hover-clr);
    }


    
    .user-button-button {
        border: none;
        background-color: transparent;
        margin-left: auto;
    }

    .user-button-button img {
        width: 1.5rem;
    }


    .ham-menu {
        position: relative;
        padding-left: 1rem;
        margin-right: auto;
        width: 1rem;
        height: 1rem;
    }

    .ham-menu span {
        height: .2rem;
        width: 1rem;
        background-color: #979797;
        display: block;
        margin-bottom: .17rem;
        border-radius: 1rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .ham-menu span:nth-child(1) {
        top: 25%;
    }

    .ham-menu span:nth-child(2) {
        top: 50%;
    }
    
    .ham-menu span:nth-child(3) {
        top: 75%;
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
        position: absolute;
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
