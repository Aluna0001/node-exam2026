<script>
  import { getDailyHoroscope } from '../services/readingService.js'
  import { getContext, onMount } from 'svelte'

  const { navigate } = getContext('navigation')

  let horoscope = $state(null)
  let zodiacSign = $state(null)
  let reason = $state(null)
  let loading = $state(true)

  onMount(async () => {
    const data = await getDailyHoroscope()
    if (data) {
      horoscope = data.horoscope
      zodiacSign = data.zodiacSign
      reason = data.reason
    }
    loading = false
  })
</script>

<div class="cosmic-page">
  <h1>Cosmic Fortune</h1>
  <p class="subtitle">Quick guidance from the universe</p>

  {#if loading}
    <div class="loading-box">
      <div class="spinner">✨</div>
      <p>The cosmos is aligning...</p>
    </div>
  {:else if reason === 'no-birthdate'}
    <div class="no-data">
      <div class="icon">🌌</div>
      <h2>Birthdate Required</h2>
      <p>Set your birthdate in your profile to receive your cosmic fortune.</p>
      <button onclick={() => navigate('profile-settings')}>Go to Profile Settings</button>
    </div>
  {:else if horoscope}
    <div class="fortune-box">
      <div class="zodiac-header">
        <p class="zodiac-sign">{zodiacSign}</p>
      </div>
      <p class="fortune-text">{horoscope}</p>
      <p class="refresh-note">✦ Your fortune refreshes at midnight ✦</p>
    </div>
  {/if}
</div>

<style>
  .cosmic-page {
    padding: 40px;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    font-size: 36px;
    color: var(--color-text);
    margin-bottom: 10px;
  }

  .subtitle {
    color: var(--color-text-muted);
    margin-bottom: 50px;
  }

  .loading-box {
    padding: 60px;
    color: var(--color-text-muted);
  }

  .spinner {
    font-size: 48px;
    margin-bottom: 20px;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .no-data {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 60px 40px;
  }

  .no-data .icon {
    font-size: 64px;
    margin-bottom: 20px;
  }

  .no-data h2 {
    color: var(--color-text);
    margin-bottom: 15px;
  }

  .no-data p {
    color: var(--color-text-muted);
    margin-bottom: 25px;
  }

  .no-data button {
    padding: 12px 25px;
    background: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
    font-size: 14px;
  }

  .no-data button:hover {
    background: var(--color-primary-hover);
  }

  .fortune-box {
    background: linear-gradient(135deg, rgba(155, 89, 182, 0.15), rgba(212, 175, 55, 0.08));
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: 50px 40px;
  }

  .zodiac-header {
    margin-bottom: 30px;
  }

  .zodiac-sign {
    font-size: 20px;
    color: var(--color-text);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .fortune-text {
    font-size: 20px;
    line-height: 1.9;
    color: var(--color-text-light);
    font-style: italic;
    margin-bottom: 30px;
  }

  .refresh-note {
    font-size: 12px;
    color: var(--color-text-dim);
    letter-spacing: 1px;
  }
</style>