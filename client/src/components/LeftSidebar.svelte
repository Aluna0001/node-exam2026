<script>
  import { getContext } from 'svelte'

  const { navigate } = getContext('navigation')
</script>

<aside class="left-sidebar">
  <h3>MAIN FUNCTIONS</h3>
  <nav>
    <button onclick={() => navigate('tarot')}>Tarot Cards</button>
    <button onclick={() => navigate('zodiac')}>Zodiac Signs</button>
  </nav>
</aside>

<style>
  .left-sidebar h3 {
    font-size: 12px;
    letter-spacing: 2px;
    margin: 30px 0 15px 0;
    color: #888;
  }

  .left-sidebar nav button {
    display: block;
    width: 100%;
    padding: 12px 15px;
    margin: 8px 0;
    background: transparent;
    color: #d4af37;
    border: 1px solid #333;
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: all 0.3s;
  }

  .left-sidebar nav button:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #d4af37;
  }
</style>