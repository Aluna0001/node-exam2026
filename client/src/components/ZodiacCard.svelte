<script>
  const { zodiac, isUserSign, onSelect } = $props()
</script>

<button
  class="zodiac-card"
  class:user-sign={isUserSign}
  onclick={() => onSelect(zodiac)}
>
  <div class="symbol">{zodiac.symbol}</div>
  <h3>{zodiac.name}</h3>
  <p class="dates">{zodiac.dates}</p>
</button>

<style>
  .zodiac-card {
    background: var(--color-primary-faint);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--color-text);
    font-family: var(--font-family);
    width: 100%;
  }

  .zodiac-card:hover {
    border-color: var(--color-primary);
    transform: translateY(-5px);
  }

  .zodiac-card.user-sign {
    border-color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  .symbol {
    font-size: 64px;
    margin-bottom: 15px;
  }

  h3 {
    color: var(--color-text);
    margin-bottom: 10px;
  }

  .dates {
    color: var(--color-text-muted);
    font-size: 14px;
  }
</style>