<script>
  import { account } from '../stores/auth.js'
  import { logout } from '../services/authService.js'
  import TarotPage from './TarotPage.svelte'
  import LeftSidebar from '../components/LeftSidebar.svelte'
  import RightSidebar from '../components/RightSidebar.svelte'

  let currentPage = $state('home')
  
  function navigate(page) {
    currentPage = page
  }
</script>

<div class="dashboard">
  <header class="top-header">
    <button class="logo" onclick={() => navigate('home')}>✨ Mystical Portal</button>
    <button class="logout-btn" onclick={logout}>Log out</button>
  </header>

  <div class="layout">
    <LeftSidebar onNavigate={navigate} />

    <main class="content">
      {#if currentPage === 'home'}
        <h1>Welcome to The Mystical Portal</h1>
        <p>Open the door to the universe's secrets. Here you can explore tarot, astrology, and palmistry to discover your true path.</p>
      
        <div class="cards">
          <div class="card">
            <div class="icon">⭐</div>
            <h3>Tarot</h3>
            <p>Let the cards show the way</p>
          </div>
          <div class="card">
            <div class="icon">🌙</div>
            <h3>Zodiac</h3>
            <p>Experience cosmic wisdom</p>
          </div>
          <div class="card">
            <div class="icon">✨</div>
            <h3>Palm Reading</h3>
            <p>Read your destiny</p>
          </div>
        </div>
      {:else if currentPage === 'tarot'}
        <TarotPage />
      {/if}
    </main>

    <RightSidebar />
  </div>
</div>

<style>
  .dashboard {
    min-height: 100vh;
    background: #0a0a0a;
    color: #d4af37;
    font-family: system-ui, -apple-system, sans-serif;
  }

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

  .layout {
    display: grid;
    grid-template-columns: 250px 1fr 300px;
    gap: 20px;
    padding: 20px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .content {
    padding: 20px;
  }

  .content h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 15px;
  }

  .content > p {
    text-align: center;
    color: #888;
    max-width: 600px;
    margin: 0 auto 50px;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;
  }

  .card {
    padding: 40px 20px;
    border: 1px solid #333;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
  }

  .card:hover {
    border-color: #d4af37;
    transform: translateY(-5px);
  }

  .card .icon {
    font-size: 48px;
    margin-bottom: 15px;
  }

  .card h3 {
    margin: 15px 0 10px;
  }

  .card p {
    color: #888;
    font-size: 14px;
  }
</style>