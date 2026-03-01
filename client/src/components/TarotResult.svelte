<script>
  const { card, interpretation, onDrawAnother } = $props()
  const API_URL = import.meta.env.VITE_API_URL
</script>

<div class="result">
  <h2>{card.name}</h2>
  <p class="base-meaning">{card.baseMeaning}</p>

  <div class="reading-layout">
    <img src={`${API_URL}${card.imageUrl}`} alt={card.name} />

    <div class="interpretation">
      <h3>Your Reading</h3>
      <p>{interpretation}</p>
    </div>
  </div>

  <button class="draw-again" onclick={onDrawAnother}>
    Draw Another Card
  </button>
</div>

<style>
  .result {
    margin-top: 40px;
  }

  .result h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 10px;
    color: var(--color-text);
  }

  .base-meaning {
    text-align: center;
    color: var(--color-text-muted);
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
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .interpretation {
    width: 100%;
    max-width: 700px;
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 30px;
  }

  .interpretation h3 {
    color: var(--color-text);
    margin-top: 0;
    margin-bottom: 15px;
  }

  .interpretation p {
    line-height: 1.8;
    text-align: left;
    color: var(--color-text);
  }

  .draw-again {
    display: block;
    margin: 20px auto 0;
    padding: 15px 30px;
    background: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
  }

  .draw-again:hover {
    background: var(--color-primary-hover);
  }
</style>