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
    <p class="subtitle">Ask a question and draw a card to receive guidance</p>

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
    color: var(--color-text);
  }

  .subtitle {
    text-align: center;
    color: var(--color-text-muted);
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
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: 16px;
    font-family: var(--font-family);
  }

  input::placeholder {
    color: var(--color-text-dim);
  }

  button {
    padding: 15px 30px;
    background: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: var(--color-danger);
    text-align: center;
  }

  .limit-reached {
    max-width: 600px;
    margin: 60px auto;
    text-align: center;
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 60px 40px;
  }

  .moon-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }

  .limit-reached h2 {
    font-size: 32px;
    color: var(--color-text);
    margin-bottom: 20px;
  }

  .limit-message {
    font-size: 16px;
    line-height: 1.8;
    color: var(--color-text-light);
    margin-bottom: 30px;
  }

  .reset-info {
    font-size: 14px;
    color: var(--color-text-muted);
    margin-bottom: 10px;
  }

  .countdown {
    font-size: 18px;
    color: var(--color-text);
    font-weight: bold;
  }
</style>