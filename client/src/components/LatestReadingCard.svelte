<script>
  import { getLatestReading } from '../services/readingService.js'
  import { getContext, onMount, onDestroy } from 'svelte'

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

  function timeAgo(timestamp) {
    const now = new Date()
    const then = new Date(timestamp)
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
    return `${Math.floor(seconds / 86400)} days ago`
  }

  function viewReading() {
    navigate('reading')
  }
</script>

<div class="latest-reading">
  {#if loading}
    <p class="loading">Loading...</p>
  {:else if reading}
    <p class="card-name">{reading.card_name}</p>
    <p class="timestamp">{timeAgo(reading.created_at)}</p>
    <button class="view-btn" onclick={viewReading}>View Reading</button>
  {:else}
    <p class="no-reading">You haven't received any wisdom yet</p>
  {/if}
</div>

<style>
  .latest-reading {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    text-align: center;
  }

  .loading {
    color: #888;
    font-size: 14px;
  }

  .card-name {
    font-size: 18px;
    color: #d4af37;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .timestamp {
    font-size: 12px;
    color: #666;
    margin-bottom: 15px;
  }

  .view-btn {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid #d4af37;
    color: #d4af37;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  .view-btn:hover {
    background: rgba(212, 175, 55, 0.1);
  }

  .no-reading {
    color: #666;
    font-size: 14px;
    font-style: italic;
  }
</style>