<script>
  import { getLatestReading } from '../services/readingService.js'
  import { getContext, onMount, onDestroy } from 'svelte'
  import { timeAgo } from '../utils/timeUtil.js'

  const { navigate } = getContext('navigation')

  let reading = $state(null)
  let loading = $state(true)

  async function loadReading() {
    reading = await getLatestReading()
    loading = false
  }

  onMount(async () => {
    await loadReading()
    window.addEventListener('reading-updated', loadReading)
  })

  onDestroy(() => {
    window.removeEventListener('reading-updated', loadReading)
  })
</script>

<div class="latest-reading">
  {#if loading}
    <p class="loading">Loading...</p>
  {:else if reading}
    <p class="card-name">{reading.card_name}</p>
    <p class="timestamp">{timeAgo(reading.created_at)}</p>
    <div class="buttons">
      <button class="view-btn" onclick={() => navigate('reading')}>View Latest</button>
      <button class="history-btn" onclick={() => navigate('tarot-history')}>All Readings</button>
    </div>
  {:else}
    <p class="no-reading">You haven't received any wisdom yet</p>
  {/if}
</div>

<style>
  .latest-reading {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 20px;
    margin: 15px 0;
    text-align: center;
  }

  .loading {
    color: var(--color-text-muted);
    font-size: 14px;
  }

  .card-name {
    font-size: 18px;
    color: var(--color-text);
    font-weight: bold;
    margin-bottom: 8px;
  }

  .timestamp {
    font-size: 12px;
    color: var(--color-text-dim);
    margin-bottom: 15px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .view-btn {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid var(--color-text);
    color: var(--color-text);
    border-radius: var(--radius-sm);
    font-size: 14px;
  }

  .view-btn:hover {
    background: var(--color-primary-soft);
  }

  .history-btn {
    width: 100%;
    padding: 10px;
    background: var(--color-primary);
    border: none;
    color: var(--color-bg);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: bold;
  }

  .history-btn:hover {
    background: var(--color-primary-hover);
  }

  .no-reading {
    color: var(--color-text-dim);
    font-size: 14px;
    font-style: italic;
  }
</style>