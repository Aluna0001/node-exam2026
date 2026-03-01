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
    color: #d4af37;
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
    color: #d4af37;
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
    padding: 15px 30px;
    background: #d4af37;
    color: #0a0a0a;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  .draw-again:hover {
    background: #f4d03f;
  }
</style>