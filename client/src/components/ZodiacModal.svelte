<script>
  const { zodiac, onClose } = $props()
</script>

<div
  class="modal-overlay"
  onclick={onClose}
  onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && onClose()}
  role="button"
  tabindex="0"
  aria-label="Close modal"
>
  <div
    class="modal"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <button class="close-btn" onclick={onClose} aria-label="Close">✕</button>

    <div class="modal-header">
      <div class="modal-symbol">{zodiac.symbol}</div>
      <h2>{zodiac.name}</h2>
      <p class="modal-dates">{zodiac.dates}</p>
      <p class="element">Element: {zodiac.element}</p>
    </div>

    <div class="modal-body">
      <p class="description">{zodiac.description}</p>
      <div class="traits">
        <h4>Key Traits</h4>
        <p>{zodiac.traits}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .modal {
    background: #1a1a1a;
    border: 2px solid #d4af37;
    border-radius: 12px;
    padding: 40px;
    max-width: 500px;
    width: 90%;
    position: relative;
    cursor: default;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: #d4af37;
    font-size: 32px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
  }

  .close-btn:hover {
    color: #f4d03f;
  }

  .modal-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .modal-symbol {
    font-size: 80px;
    margin-bottom: 15px;
  }

  .modal h2 {
    color: #d4af37;
    font-size: 32px;
    margin-bottom: 10px;
  }

  .modal-dates {
    color: #888;
    margin-bottom: 10px;
  }

  .element {
    color: #d4af37;
    font-style: italic;
  }

  .modal-body {
    color: #ccc;
  }

  .description {
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .traits h4 {
    color: #d4af37;
    margin-bottom: 10px;
  }

  .traits p {
    color: #888;
  }
</style>