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
    background: rgba(212, 175, 55, 0.05);
    border: 2px solid #333;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    color: #d4af37;
    font-family: inherit;
    width: 100%;
  }

  .zodiac-card:hover {
    border-color: #d4af37;
    transform: translateY(-5px);
  }

  .zodiac-card.user-sign {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
  }

  .symbol {
    font-size: 64px;
    margin-bottom: 15px;
  }

  h3 {
    color: #d4af37;
    margin-bottom: 10px;
  }

  .dates {
    color: #888;
    font-size: 14px;
  }
</style>