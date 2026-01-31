<script>
  import { drawTarotCard } from '../services/tarotService.js'
  import toastr from 'toastr'

  let question = $state('')
  let card = $state(null)
  let interpretation = $state(null)
  let loading = $state(false)
  let error = $state(null)
  let limitReached = $state(false)
  let resetTime = $state(null)

  async function drawCard() {
    if (!question.trim()) {
      error = 'Please enter a question'
      return
    }

    loading = true

    try {
      const result = await drawTarotCard(question)
      
      if (result.limitReached) {
        limitReached = true
        resetTime = result.resetTime
        toastr.error('Daily limit reached')
      } else {
        card = result.card
        interpretation = result.interpretation
        toastr.success('Card drawn!')
        
        window.dispatchEvent(new CustomEvent('reading-updated'))
      }
    } catch (error) {
      if (error.message.includes('Daily limit')) {
        limitReached = true
      } else {
        toastr.error(error.message)
      }
    } finally {
      loading = false
    }
  }

  function getTimeUntilReset() {
    if (!resetTime) return ''
    
    const now = new Date()
    const reset = new Date(resetTime)
    const diff = reset.getTime() - now.getTime()
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m`
  }
</script>

<div class="tarot-page">
  <h1>Tarot Card Reading</h1>
  <p>Ask a question and draw a card to receive guidance</p>

  {#if limitReached}
    <div class="limit-reached">
      <div class="moon-icon">🌙</div>
      <h2>Daily Limit Reached</h2>
      <p class="limit-message">
        You have drawn your 2 cards for today. The tarot requires time for energies 
        to settle and vibrations to realign. Drawing too many cards in one day can 
        dilute the spiritual connection and lead to unclear guidance.
      </p>
      <p class="reset-info">
        Your readings will refresh at midnight
      </p>
      {#if resetTime}
        <p class="countdown">Resets in: {getTimeUntilReset()}</p>
      {/if}
    </div>
  {:else}
    <div class="question-box">
      <input 
        type="text" 
        placeholder="What question weighs on your heart?" 
        bind:value={question}
      />
      <button onclick={drawCard} disabled={loading}>
        {loading ? 'Drawing...' : 'Draw Card'}
      </button>
    </div>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    {#if card && interpretation}
      <div class="result">
        <h2>{card.name}</h2>
        <p class="base-meaning">{card.baseMeaning}</p>

        <div class="reading-layout">
          <img src={`http://localhost:8080${card.imageUrl}`} alt={card.name} />
          
          <div class="interpretation">
            <h3>Your Reading</h3>
            <p>{interpretation}</p>
          </div>
        </div>

        <button class="draw-again" onclick={() => { card = null; interpretation = null; question = '' }}>
          Draw Another Card
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .tarot-page {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    color: #888;
    margin-bottom: 40px;
  }

  .question-box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  input {
    flex: 1;
    padding: 15px;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 8px;
    color: #d4af37;
    font-size: 16px;
  }

  input::placeholder {
    color: #666;
  }

  button {
    padding: 15px 30px;
    background: #d4af37;
    color: #0a0a0a;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: #dc3545;
    text-align: center;
  }

  .result {
    margin-top: 40px;
  }

  .result h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 10px;
  }

  .base-meaning {
    text-align: center;
    color: #888;
    font-style: italic;
    margin-bottom: 30px;
  }

  .reading-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
  }

  .reading-layout img {
    width: 200px;
    height: 320px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  }

  .interpretation {
    width: 100%;
    max-width: 700px;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 30px;
  }

  .interpretation h3 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  .interpretation p {
    line-height: 1.8;
    text-align: left;
    color: #d4af37;
  }

  .draw-again {
    display: block;
    margin: 20px auto 0;
  }

  .limit-reached {
    max-width: 600px;
    margin: 60px auto;
    text-align: center;
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 60px 40px;
  }

  .moon-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }

  .limit-reached h2 {
    font-size: 32px;
    color: #d4af37;
    margin-bottom: 20px;
  }

  .limit-message {
    font-size: 16px;
    line-height: 1.8;
    color: #ccc;
    margin-bottom: 30px;
  }

  .reset-info {
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
  }

  .countdown {
    font-size: 18px;
    color: #d4af37;
    font-weight: bold;
  }
</style>