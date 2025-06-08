<script lang="ts">
    let groups = $state([
        { name: 'Group 1' },
        { name: 'Group 2' },
        { name: 'Group 3' },
    ]);

</script>


<div class="main-wrapper">
    {#each groups as group}
        <div class="group-card">
            <h2>{group.name}</h2>
        </div>
    {/each}
</div>



<style>

    .main-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>