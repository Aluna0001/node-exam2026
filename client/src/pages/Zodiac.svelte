<script>
  import { account } from '../stores/auth.js'

  let selectedZodiac = $state(null)

  const zodiacSigns = [
    {
      name: 'Aries',
      symbol: '♈',
      dates: 'March 21 - April 19',
      element: 'Fire',
      description: 'Bold and ambitious, Aries dives headfirst into even the most challenging situations. Natural leaders with infectious enthusiasm.',
      traits: 'Leadership, Energy, Courage, Confidence'
    },
    {
      name: 'Taurus',
      symbol: '♉',
      dates: 'April 20 - May 20',
      element: 'Earth',
      description: 'Patient and reliable, Taurus values stability and comfort. Dedicated to creating a secure and beautiful environment.',
      traits: 'Reliability, Patience, Devotion, Stability'
    },
    {
      name: 'Gemini',
      symbol: '♊',
      dates: 'May 21 - June 20',
      element: 'Air',
      description: 'Curious and adaptable, Gemini thrives on variety and intellectual stimulation. Natural communicators with quick wit.',
      traits: 'Curiosity, Adaptability, Communication, Wit'
    },
    {
      name: 'Cancer',
      symbol: '♋',
      dates: 'June 21 - July 22',
      element: 'Water',
      description: 'Nurturing and intuitive, Cancer deeply values home and family. Protective and empathetic with strong emotional intelligence.',
      traits: 'Empathy, Intuition, Protection, Loyalty'
    },
    {
      name: 'Leo',
      symbol: '♌',
      dates: 'July 23 - August 22',
      element: 'Fire',
      description: 'Confident and charismatic, Leo radiates warmth and creativity. Natural performers who inspire and uplift others.',
      traits: 'Confidence, Creativity, Generosity, Warmth'
    },
    {
      name: 'Virgo',
      symbol: '♍',
      dates: 'August 23 - September 22',
      element: 'Earth',
      description: 'Analytical and practical, Virgo excels at organization and attention to detail. Dedicated to improvement and service.',
      traits: 'Analysis, Precision, Service, Practicality'
    },
    {
      name: 'Libra',
      symbol: '♎',
      dates: 'September 23 - October 22',
      element: 'Air',
      description: 'Diplomatic and fair-minded, Libra seeks balance and harmony in all things. Natural peacemakers with refined aesthetic sense.',
      traits: 'Balance, Diplomacy, Harmony, Justice'
    },
    {
      name: 'Scorpio',
      symbol: '♏',
      dates: 'October 23 - November 21',
      element: 'Water',
      description: 'Intense and passionate, Scorpio possesses remarkable depth and determination. Transformative and fiercely loyal.',
      traits: 'Passion, Intensity, Loyalty, Transformation'
    },
    {
      name: 'Sagittarius',
      symbol: '♐',
      dates: 'November 22 - December 21',
      element: 'Fire',
      description: 'Adventurous and optimistic, Sagittarius seeks truth and new experiences. Free-spirited philosophers with infectious enthusiasm.',
      traits: 'Adventure, Optimism, Freedom, Wisdom'
    },
    {
      name: 'Capricorn',
      symbol: '♑',
      dates: 'December 22 - January 19',
      element: 'Earth',
      description: 'Disciplined and ambitious, Capricorn builds lasting success through perseverance. Wise beyond their years with strong principles.',
      traits: 'Discipline, Ambition, Responsibility, Wisdom'
    },
    {
      name: 'Aquarius',
      symbol: '♒',
      dates: 'January 20 - February 18',
      element: 'Air',
      description: 'Innovative and humanitarian, Aquarius envisions a better future for all. Original thinkers who value independence and progress.',
      traits: 'Innovation, Independence, Humanitarianism, Vision'
    },
    {
      name: 'Pisces',
      symbol: '♓',
      dates: 'February 19 - March 20',
      element: 'Water',
      description: 'Compassionate and artistic, Pisces navigates life through intuition and empathy. Dreamers who connect deeply with others.',
      traits: 'Compassion, Intuition, Creativity, Empathy'
    }
  ]

  function getUserZodiacName() {
    if (!$account?.zodiacSign) return null
    return $account.zodiacSign.split(' ')[0]
  }

  function openModal(zodiac) {
    selectedZodiac = zodiac
  }

  function closeModal() {
    selectedZodiac = null
  }
</script>

<div class="zodiac-page">
  <h1>Zodiac Signs</h1>
  <p class="subtitle">Discover the cosmic energies that guide each sign</p>

  {#if $account?.zodiacSign}
    <div class="user-zodiac">
      <p>Your Zodiac: <span class="highlight">{$account.zodiacSign}</span></p>
    </div>
  {/if}

  <div class="zodiac-grid">
    {#each zodiacSigns as zodiac}
      <button 
        class="zodiac-card" 
        class:user-sign={getUserZodiacName() === zodiac.name}
        onclick={() => openModal(zodiac)}
      >
        <div class="symbol">{zodiac.symbol}</div>
        <h3>{zodiac.name}</h3>
        <p class="dates">{zodiac.dates}</p>
      </button>
    {/each}
  </div>
</div>

{#if selectedZodiac}
  <div 
    class="modal-overlay" 
    onclick={closeModal}
    onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter') && closeModal()}
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
      <button class="close-btn" onclick={closeModal} aria-label="Close">✕</button>
      
      <div class="modal-header">
        <div class="modal-symbol">{selectedZodiac.symbol}</div>
        <h2>{selectedZodiac.name}</h2>
        <p class="modal-dates">{selectedZodiac.dates}</p>
        <p class="element">Element: {selectedZodiac.element}</p>
      </div>

      <div class="modal-body">
        <p class="description">{selectedZodiac.description}</p>
        <div class="traits">
          <h4>Key Traits</h4>
          <p>{selectedZodiac.traits}</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .zodiac-page {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    font-size: 36px;
    color: #d4af37;
    margin-bottom: 10px;
  }

  .subtitle {
    text-align: center;
    color: #888;
    margin-bottom: 30px;
  }

  .user-zodiac {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 12px;
  }

  .user-zodiac p {
    font-size: 18px;
    color: #ccc;
  }

  .highlight {
    color: #d4af37;
    font-weight: bold;
    font-size: 24px;
  }

  .zodiac-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .zodiac-card {
    background: rgba(212, 175, 55, 0.05);
    border: 2px solid #333;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
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

  .zodiac-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
</style>