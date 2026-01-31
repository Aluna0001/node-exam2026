<script>
  import { getLatestReading } from '../services/readingService.js'
  import { onMount } from 'svelte'

  let reading = $state(null)
  let loading = $state(true)

  onMount(async () => {
    reading = await getLatestReading()
    loading = false
  })
</script>

<div class="reading-detail">
  {#if loading}
    <p class="loading">Loading your reading...</p>
  {:else if reading}
    <h1>{reading.card_name}</h1>
    
    <div class="card-image">
      <img src={`http://localhost:8080${reading.card_image}`} alt={reading.card_name} />
    </div>

    <div class="question-section">
      <h3>Your Question</h3>
      <p>{reading.question}</p>
    </div>

    <div class="interpretation-section">
      <h3>Your Reading</h3>
      <p>{reading.interpretation}</p>
    </div>

    <p class="date">Read on {new Date(reading.created_at).toLocaleString()}</p>
  {:else}
    <p class="no-reading">No reading found</p>
  {/if}
</div>

<style>
  .reading-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
  }

  .loading {
    text-align: center;
    color: #888;
    font-size: 18px;
  }

  h1 {
    text-align: center;
    font-size: 36px;
    color: #d4af37;
    margin-bottom: 30px;
  }

  .card-image {
    text-align: center;
    margin-bottom: 40px;
  }

  .card-image img {
    width: 200px;
    height: 320px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  }

  .question-section,
  .interpretation-section {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 20px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #d4af37;
  }

  p {
    line-height: 1.8;
    color: #ccc;
  }

  .date {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 30px;
  }

  .no-reading {
    text-align: center;
    color: #666;
    font-size: 18px;
  }
</style>