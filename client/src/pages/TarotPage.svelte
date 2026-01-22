<script>
    import { drawTarotCard } from '../services/tarotService.js'
    import toastr from 'toastr'


  let question = $state('')
  let card = $state(null)
  let interpretation = $state(null)
  let loading = $state(false)
  let error = $state(null)

  async function drawCard() {
    if (!question.trim()) {
      error = 'Please enter a question'
      return
    }

    loading = true

    try {
      const result = await drawTarotCard(question)
      card = result.card
      interpretation = result.interpretation
      toastr.success('Card drawn!')
    } catch (error) {
      toastr.error(error.message)
    } finally {
      loading = false
    }
  }
</script>

<div class="tarot-page">
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

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if card && interpretation}
    <div class="result">
      <div class="card-display">
        <img src={`http://localhost:8080${card.imageUrl}`} alt={card.name} />
        <h2>{card.name}</h2>
        <p class="base-meaning">{card.baseMeaning}</p>
      </div>

      <div class="interpretation">
        <h3>Your Reading</h3>
        <p>{interpretation}</p>
      </div>

      <button class="draw-again" onclick={() => { card = null; interpretation = null; question = '' }}>
        Draw Another Card
      </button>
    </div>
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

  .card-display {
    text-align: center;
    margin-bottom: 30px;
  }

  .card-display img {
    max-width: 300px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  }

  .card-display h2 {
    margin: 20px 0 10px;
    font-size: 32px;
  }

  .base-meaning {
    color: #888;
    font-style: italic;
  }

  .interpretation {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 30px;
    margin: 20px 0;
  }

  .interpretation h3 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  .interpretation p {
    line-height: 1.8;
    text-align: left;
  }

  .draw-again {
    display: block;
    margin: 20px auto 0;
  }
</style>