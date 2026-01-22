<script>
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
    error = null

    console.log('Drawing card with question:', question)
    
    loading = false
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
</style>