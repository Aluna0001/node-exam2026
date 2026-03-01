<script>
  import { getReadingHistory } from '../services/readingService.js'
  import { onMount } from 'svelte'

  const API_URL = import.meta.env.VITE_API_URL

  let readings = $state([])
  let loading = $state(true)
  let selectedReading = $state(null)
</script>

<div class="history-page">
  <h1>Your Reading History</h1>
  <p class="subtitle">All the wisdom the cards have shared with you</p>

  {#if loading}
    {#await getReadingHistory() then data}
      {readings = data, loading = false, ''}
    {/await}
  {/if}

  {#if !loading && readings.length === 0}
    <div class="empty">
      <div class="icon">🃏</div>
      <p>You haven't drawn any cards yet</p>
    </div>
  {/if}

  {#if !loading && readings.length > 0}
    <div class="readings-grid">
      {#each readings as reading}
        <button class="reading-card" onclick={() => selectedReading = reading}>
          <div class="card-image">
            <img src={`${API_URL}${reading.card_image}`} alt={reading.card_name} />
          </div>
          <div class="card-info">
            <h3>{reading.card_name}</h3>
            <p class="question">"{reading.question}"</p>
            <p class="date">{new Date(reading.created_at).toLocaleDateString()}</p>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if selectedReading}
  <div
    class="modal-overlay"
    onclick={() => selectedReading = null}
    onkeydown={(e) => e.key === 'Escape' && (selectedReading = null)}
    role="button"
    tabindex="0"
    aria-label="Close modal"
  >
    <div
      class="modal"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <button class="close-btn" onclick={() => selectedReading = null} aria-label="Close">✕</button>

      <div class="modal-header">
        <img src={`${API_URL}${selectedReading.card_image}`} alt={selectedReading.card_name} />
        <div>
          <h2>{selectedReading.card_name}</h2>
          <p class="modal-date">{new Date(selectedReading.created_at).toLocaleString()}</p>
        </div>
      </div>

      <div class="modal-section">
        <h4>Your Question</h4>
        <p>{selectedReading.question}</p>
      </div>

      <div class="modal-section">
        <h4>Your Reading</h4>
        <p>{selectedReading.interpretation}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .history-page {
    padding: 40px;
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    font-size: 36px;
    color: var(--color-text);
    margin-bottom: 10px;
  }

  .subtitle {
    text-align: center;
    color: var(--color-text-muted);
    margin-bottom: 40px;
  }

  .empty {
    text-align: center;
    padding: 60px;
    color: var(--color-text-muted);
  }

  .empty .icon {
    font-size: 64px;
    margin-bottom: 20px;
  }

  .readings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .reading-card {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 20px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--color-text);
    font-family: var(--font-family);
    width: 100%;
  }

  .reading-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-3px);
  }

  .card-image img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: var(--radius-md);
    margin-bottom: 15px;
  }

  .card-info h3 {
    font-size: 18px;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  .question {
    font-size: 13px;
    color: var(--color-text-muted);
    font-style: italic;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date {
    font-size: 12px;
    color: var(--color-text-dim);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .modal {
    background: var(--color-surface);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: 40px;
    max-width: 600px;
    width: 90%;
    position: relative;
    cursor: default;
    max-height: 80vh;
    overflow-y: auto;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: 32px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
  }

  .close-btn:hover {
    color: var(--color-primary-hover);
  }

  .modal-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 30px;
  }

  .modal-header img {
    width: 80px;
    height: 130px;
    object-fit: cover;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    flex-shrink: 0;
  }

  .modal-header h2 {
    font-size: 28px;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  .modal-date {
    font-size: 13px;
    color: var(--color-text-dim);
  }

  .modal-section {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 20px;
    margin-bottom: 15px;
  }

  .modal-section h4 {
    color: var(--color-text);
    margin-bottom: 10px;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .modal-section p {
    color: var(--color-text-light);
    line-height: 1.8;
  }
</style>