<script>
  import { account } from '../stores/auth.js'
  import { get } from 'svelte/store'
  import ZodiacCard from '../components/ZodiacCard.svelte'
  import ZodiacModal from '../components/ZodiacModal.svelte'

  let selectedZodiac = $state(null)
  const user = $derived(get(account))

  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', dates: 'March 21 - April 19', element: 'Fire', description: 'Bold and ambitious, Aries dives headfirst into even the most challenging situations. Natural leaders with infectious enthusiasm.', traits: 'Leadership, Energy, Courage, Confidence' },
    { name: 'Taurus', symbol: '♉', dates: 'April 20 - May 20', element: 'Earth', description: 'Patient and reliable, Taurus values stability and comfort. Dedicated to creating a secure and beautiful environment.', traits: 'Reliability, Patience, Devotion, Stability' },
    { name: 'Gemini', symbol: '♊', dates: 'May 21 - June 20', element: 'Air', description: 'Curious and adaptable, Gemini thrives on variety and intellectual stimulation. Natural communicators with quick wit.', traits: 'Curiosity, Adaptability, Communication, Wit' },
    { name: 'Cancer', symbol: '♋', dates: 'June 21 - July 22', element: 'Water', description: 'Nurturing and intuitive, Cancer deeply values home and family. Protective and empathetic with strong emotional intelligence.', traits: 'Empathy, Intuition, Protection, Loyalty' },
    { name: 'Leo', symbol: '♌', dates: 'July 23 - August 22', element: 'Fire', description: 'Confident and charismatic, Leo radiates warmth and creativity. Natural performers who inspire and uplift others.', traits: 'Confidence, Creativity, Generosity, Warmth' },
    { name: 'Virgo', symbol: '♍', dates: 'August 23 - September 22', element: 'Earth', description: 'Analytical and practical, Virgo excels at organization and attention to detail. Dedicated to improvement and service.', traits: 'Analysis, Precision, Service, Practicality' },
    { name: 'Libra', symbol: '♎', dates: 'September 23 - October 22', element: 'Air', description: 'Diplomatic and fair-minded, Libra seeks balance and harmony in all things. Natural peacemakers with refined aesthetic sense.', traits: 'Balance, Diplomacy, Harmony, Justice' },
    { name: 'Scorpio', symbol: '♏', dates: 'October 23 - November 21', element: 'Water', description: 'Intense and passionate, Scorpio possesses remarkable depth and determination. Transformative and fiercely loyal.', traits: 'Passion, Intensity, Loyalty, Transformation' },
    { name: 'Sagittarius', symbol: '♐', dates: 'November 22 - December 21', element: 'Fire', description: 'Adventurous and optimistic, Sagittarius seeks truth and new experiences. Free-spirited philosophers with infectious enthusiasm.', traits: 'Adventure, Optimism, Freedom, Wisdom' },
    { name: 'Capricorn', symbol: '♑', dates: 'December 22 - January 19', element: 'Earth', description: 'Disciplined and ambitious, Capricorn builds lasting success through perseverance. Wise beyond their years with strong principles.', traits: 'Discipline, Ambition, Responsibility, Wisdom' },
    { name: 'Aquarius', symbol: '♒', dates: 'January 20 - February 18', element: 'Air', description: 'Innovative and humanitarian, Aquarius envisions a better future for all. Original thinkers who value independence and progress.', traits: 'Innovation, Independence, Humanitarianism, Vision' },
    { name: 'Pisces', symbol: '♓', dates: 'February 19 - March 20', element: 'Water', description: 'Compassionate and artistic, Pisces navigates life through intuition and empathy. Dreamers who connect deeply with others.', traits: 'Compassion, Intuition, Creativity, Empathy' }
  ]

  function getUserZodiacName() {
    if (!user?.zodiacSign) return null
    return user.zodiacSign.split(' ')[0]
  }
</script>

<div class="zodiac-page">
  <h1>Zodiac Signs</h1>
  <p class="subtitle">Discover the cosmic energies that guide each sign</p>

  {#if user?.zodiacSign}
    <div class="user-zodiac">
      <p>Your Zodiac: <span class="highlight">{user.zodiacSign}</span></p>
    </div>
  {/if}

  <div class="zodiac-grid">
    {#each zodiacSigns as zodiac}
      <ZodiacCard
        {zodiac}
        isUserSign={getUserZodiacName() === zodiac.name}
        onSelect={(z) => selectedZodiac = z}
      />
    {/each}
  </div>
</div>

{#if selectedZodiac}
  <ZodiacModal
    zodiac={selectedZodiac}
    onClose={() => selectedZodiac = null}
  />
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
    color: var(--color-text);
    margin-bottom: 10px;
  }

  .subtitle {
    text-align: center;
    color: var(--color-text-muted);
    margin-bottom: 30px;
  }

  .user-zodiac {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: var(--color-primary-soft);
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

  .zodiac-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
</style>