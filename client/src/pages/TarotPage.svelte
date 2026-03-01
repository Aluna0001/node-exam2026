<script>
  import { drawTarotCard, checkDailyLimit } from '../services/tarotService.js'
  import { onMount } from 'svelte'
  import toastr from 'toastr'
  import TarotResult from '../components/TarotResult.svelte'

  let question = $state('')
  let card = $state(null)
  let interpretation = $state(null)
  let loading = $state(false)
  let err = $state(null)
  let limitReached = $state(false)
  let resetTime = $state(null)

  onMount(async () => {
    const limitStatus = await checkDailyLimit()

    if (limitStatus.limitReached) {
      limitReached = true
      resetTime = limitStatus.resetTime
    }
  })

  async function drawCard() {
    if (!question.trim()) {
      err = 'Please enter a question'
      return
    }

    loading = true
    err = null

    try {
      const result = await drawTarotCard(question)

      if (result.limitReached) {
        limitReached = true
        resetTime = result.resetTime
        card = null
        interpretation = null
        question = ''
        toastr.error('Daily limit reached')
      } else {
        card = result.card
        interpretation = result.interpretation
        toastr.success('Card drawn!')
        window.dispatchEvent(new CustomEvent('reading-updated'))
      }
    } catch (e) {
      if (e.message.includes('Daily limit')) {
        limitReached = true
        card = null
        interpretation = null
        question = ''
      } else {
        toastr.error(e.message)
      }
    } finally {
      loading = false
    }
  }

  async function handleDrawAnother() {
    const limitStatus = await checkDailyLimit()

    if (limitStatus.limitReached) {
      limitReached = true
      resetTime = limitStatus.resetTime
      card = null
      interpretation = null
      toastr.info('Daily limit reached')
    } else {
      card = null
      interpretation = null
      question = ''
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
  {#if limitReached}
    <div class="limit-reached">
      <div class="moon-icon">🌙</div>
      <h2>Daily Limit Reached</h2>
      <p class="limit-message">
        You have drawn your 2 cards for today. The tarot requires time for energies
        to settle and vibrations to realign. Drawing too many cards in one day can
        dilute the spiritual connection and lead to unclear guidance.
      </p>
      <p class="reset-info">Your readings will refresh at midnight</p>
      {#if resetTime}
        <p class="countdown">Resets in: {getTimeUntilReset()}</p>
      {/if}
    </div>
  {:else}
    <h1>Tarot Card Reading</h1>
    <p>Ask a question and draw a card to receive guidance</p>

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

    {#if err}
      <p class="error">{err}</p>
    {/if}

    {#if card && interpretation}
      <TarotResult {card} {interpretation} onDrawAnother={handleDrawAnother} />
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
    color: #d4af37;
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