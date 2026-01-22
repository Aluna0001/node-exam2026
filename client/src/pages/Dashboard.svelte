<script>
  import { account } from '../stores/auth.js'
  import { logout } from '../services/authService.js'
  import TarotPage from './TarotPage.svelte'

  let currentPage = $state('home')
</script>

<div class="dashboard">
  <header class="top-header">
    <div class="logo">✨ Mystical Portal</div>
    <button class="logout-btn" onclick={logout}>Log out</button>
  </header>

  <div class="layout">
    <aside class="left-sidebar">
      <h3>MAIN FUNCTIONS</h3>
      <nav>
        <button onclick={() => currentPage = 'tarot'}>Tarot Cards</button>
        <button>Zodiac Signs</button>
        <button>Palm Reading</button>
      </nav>
      
      <h3>ADDITIONAL INSIGHT</h3>
      <nav>
        <button>Moon Phase</button>
        <button>Daily Horoscope</button>
        <button>Spiritual Guidance</button>
      </nav>
    </aside>

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

    <aside class="right-sidebar">
      <h3>LATEST READINGS</h3>
      <div class="reading">
        <p class="type">TAROT</p>
        <p class="title">The Stars</p>
        <p class="time">1 day ago</p>
      </div>
      
      <h3>TODAY'S ENERGY</h3>
      <div class="energy">
        <div class="icon">⭐</div>
        <p>"The universe sends you messages. Listen with your heart."</p>
      </div>
    </aside>
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

  .left-sidebar h3,
  .right-sidebar h3 {
    font-size: 12px;
    letter-spacing: 2px;
    margin: 30px 0 15px 0;
    color: #888;
  }

  .left-sidebar nav button {
    display: block;
    width: 100%;
    padding: 12px 15px;
    margin: 8px 0;
    background: transparent;
    color: #d4af37;
    border: 1px solid #333;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s;
  }

  .left-sidebar nav button:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #d4af37;
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

  .reading {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
  }

  .reading .type {
    font-size: 10px;
    letter-spacing: 1px;
    color: #888;
  }

  .reading .title {
    font-size: 16px;
    margin: 8px 0;
  }

  .reading .time {
    font-size: 12px;
    color: #666;
  }

  .energy {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    text-align: center;
  }

  .energy .icon {
    font-size: 64px;
    margin-bottom: 15px;
  }

  .energy p {
    font-style: italic;
    color: #888;
    font-size: 14px;
    line-height: 1.6;
  }
</style>

<!-- Not all features are working -->