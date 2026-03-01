<script>
  import { getContext } from 'svelte'
  import { logout } from '../services/authService.js'

  const { navigate } = getContext('navigation')
</script>

<header class="top-header">
  <button class="logo" onclick={() => navigate('home')}>✨ Mystical Portal</button>
  <button class="logout-btn" onclick={logout}>Log out</button>
</header>

<style>
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #333;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    background: none;
    border: none;
    color: #d4af37;
    cursor: pointer;
    padding: 0;
  }

  .logo:hover {
    opacity: 0.8;
  }

  .logout-btn {
    padding: 10px 20px;
    background: transparent;
    color: #d4af37;
    border: 1px solid #d4af37;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .logout-btn:hover {
    background: #d4af37;
    color: #0a0a0a;
  }
</style>