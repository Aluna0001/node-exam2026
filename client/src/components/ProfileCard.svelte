<script>
  import { account } from '../stores/auth.js'
  import { getContext } from 'svelte'
  import { get } from 'svelte/store'

  const { navigate } = getContext('navigation')
  let user = $state(get(account))

  account.subscribe(value => {
    user = value
  })
</script>

<div class="profile-card">
  <p class="username">{user?.username}</p>
  <p class="role">{user?.role}</p>

  {#if user?.bio}
    <p class="bio">{user.bio}</p>
  {/if}

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

<style>
  .profile-card {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 15px;
    margin: 15px 0;
  }

  .username {
    font-size: 18px;
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 5px;
  }

  .role {
    font-size: 12px;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .bio {
    font-size: 13px;
    color: var(--color-text-light);
    font-style: italic;
    margin-bottom: 10px;
    line-height: 1.5;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-border);
  }

  .info {
    font-size: 14px;
    color: var(--color-text-dim);
    margin: 5px 0;
  }

  .edit-btn {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    background: transparent;
    border: 1px solid var(--color-text);
    color: var(--color-text);
    border-radius: var(--radius-sm);
    font-size: 14px;
  }

  .edit-btn:hover {
    background: var(--color-primary-soft);
  }

  .zodiac {
    font-size: 18px;
    color: var(--color-text);
    margin: 10px 0;
    text-align: center;
  }
</style>