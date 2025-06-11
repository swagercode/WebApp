<div class="wrapper">
    <a href="/">
        <img src="/nav-icons/groups-icon.png" alt="spots" />
        <h1>SPOTS</h1>
    </a>
    <a href="/groups">
        <img src="/nav-icons/groups-icon.png" alt="groups" />
        <h1>GROUPS</h1>
    </a>
    <a href="/housing">
        <img src="/nav-icons/groups-icon.png" alt="housing" />
        <h1>HOUSING</h1>
    </a>
    <a href="/tutoring">
        <img src="/nav-icons/groups-icon.png" alt="tutoring" />
        <h1>TUTORING</h1>
    </a>
    <a href="/more">
        <img src="/nav-icons/groups-icon.png" alt="more" />
        <h1>MORE</h1>
    </a>
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0;
    }

    a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: calc(.1rem + 1vw);
        color: var(--font-clr);
        text-align: center;
    }

    a h1 {
        margin: 0;
        padding: 0;
    }

    a img {
        width: 90%;
        height: 90%;
        aspect-ratio: 1/1;

    }
</style>