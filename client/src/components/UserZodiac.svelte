<script>
  const { zodiacSign } = $props()
</script>

<div class="user-zodiac">
  <p>Your Zodiac: <span class="highlight">{zodiacSign}</span></p>
</div>

<style>
  .user-zodiac {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(212, 175, 55, 0.1));
    border: 1px solid rgba(155, 89, 182, 0.4);
    border-radius: var(--radius-lg);
  }

  .user-zodiac p {
    font-size: 18px;
    color: var(--color-text-light);
  }

  .highlight {
    color: var(--color-text);
    font-weight: bold;
    font-size: 24px;
  }
</style>