<script>
  import ProfileCard from './ProfileCard.svelte'
  import Chat from './Chat.svelte'
  import LatestReadingCard from './LatestReadingCard.svelte'
</script>

<aside class="right-sidebar">
  <h3>YOUR PROFILE</h3>
  <ProfileCard />

  <Chat />

  <h3>LATEST READING</h3>
  <LatestReadingCard />
</aside>

<style>
  .right-sidebar {
    position: sticky;
    top: 20px;
  }

  .right-sidebar h3 {
    font-size: 12px;
    letter-spacing: 2px;
    margin: 30px 0 15px 0;
    color: var(--color-text-muted);
  }
</style>