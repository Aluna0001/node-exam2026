<script>
  import { account } from '../stores/auth.js'
  import { getContext } from 'svelte'
  import { get } from 'svelte/store'
  import Chat from './Chat.svelte'
  import LatestReadingCard from './LatestReadingCard.svelte'

  const { navigate } = getContext('navigation')

  const user = $derived(get(account))
</script>

<aside class="right-sidebar">
  <h3>YOUR PROFILE</h3>
  <div class="profile-card">
    <p class="username">{user?.username}</p>
    <p class="role">{user?.role}</p>
    {#if user?.birthdate}
      <p class="info">Born: {user.birthdate}</p>
      {#if user?.show_zodiac && user?.zodiacSign}
        <p class="zodiac">{user.zodiacSign}</p>
      {/if}
    {:else}
      <p class="info">Birthdate: Not set</p>
    {/if}

    <button class="edit-btn" onclick={() => navigate('profile-settings')}>
      Edit Profile
    </button>
  </div>

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
    color: #888;
  }

  .profile-card {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }

  .username {
    font-size: 18px;
    font-weight: bold;
    color: #d4af37;
    margin-bottom: 5px;
  }

  .role {
    font-size: 12px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .info {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
  }

  .edit-btn {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    background: transparent;
    border: 1px solid #d4af37;
    color: #d4af37;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  .edit-btn:hover {
    background: rgba(212, 175, 55, 0.1);
  }

  .zodiac {
    font-size: 18px;
    color: #d4af37;
    margin: 10px 0;
    text-align: center;
  }
</style>