<script>
  import { setContext } from 'svelte'
  import Header from '../components/Header.svelte'
  import RightSidebar from '../components/RightSidebar.svelte'
  import TarotPage from './TarotPage.svelte'
  import TarotHistory from './TarotHistory.svelte'
  import ReadingDetail from './ReadingDetail.svelte'
  import ProfileSettings from './ProfileSettings.svelte'
  import Zodiac from './Zodiac.svelte'

  let currentPage = $state('home')

  function navigate(page) {
    currentPage = page
  }

  setContext('navigation', { navigate })
</script>

<div class="dashboard">
  <Header />

  <div class="layout">
    <main class="content">
      {#if currentPage === 'home'}
        <div class="page-content">
          <h1>Welcome to The Mystical Portal</h1>
          <p class="intro">Open the door to the universe's secrets. Here you can explore tarot, astrology, and palmistry to discover your true path.</p>

          <div class="cards">
            <button class="card" onclick={() => navigate('tarot')}>
              <div class="icon">⭐</div>
              <h3>Tarot</h3>
              <p>Let the cards show the way</p>
            </button>
            <button class="card" onclick={() => navigate('zodiac')}>
              <div class="icon">🌙</div>
              <h3>Zodiac</h3>
              <p>Experience cosmic wisdom</p>
            </button>
          </div>
        </div>
      {:else if currentPage === 'tarot'}
        <div class="page-content">
          <TarotPage />
        </div>
      {:else if currentPage === 'tarot-history'}
        <div class="page-content">
          <TarotHistory />
        </div>
      {:else if currentPage === 'reading'}
        <div class="page-content">
          <ReadingDetail />
        </div>
      {:else if currentPage === 'profile-settings'}
        <div class="page-content">
          <ProfileSettings />
        </div>
      {:else if currentPage === 'zodiac'}
        <div class="page-content">
          <Zodiac />
        </div>
      {/if}
    </main>

    <RightSidebar />
  </div>
</div>

<style>
  .dashboard {
    min-height: 100vh;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-family);
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    padding: 20px;
    max-width: 1600px;
    margin: 0 auto;
    align-items: start;
  }

  .content {
    min-height: calc(100vh - 80px);
  }

  .page-content {
    padding: 20px;
  }

  h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 15px;
  }

  .intro {
    text-align: center;
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto 50px;
  }

  .cards {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }

  .card {
    width: 220px;
    padding: 40px 20px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-align: center;
    transition: all 0.3s;
    background: transparent;
    color: var(--color-text);
    font-family: var(--font-family);
  }

  .card:hover {
    border-color: var(--color-primary);
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
    color: var(--color-text-muted);
    font-size: 14px;
  }
</style>