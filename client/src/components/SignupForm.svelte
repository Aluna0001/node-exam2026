<script>
  let username = $state('')
  let email = $state('')
  let password = $state('')
  let confirmPassword = $state('')
  let error = $state(null)
  let loading = $state(false)

  async function handleSignup(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      error = 'Passwords do not match'
      return
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters'
      return
    }

    loading = true
    error = null

    console.log('Signing up:', {username, email, password})

    loading = false
  }
</script>

<form onsubmit={handleSignup}>
  <input 
    type="text" 
    placeholder="Username" 
    bind:value={username}
    autocomplete="username"
    required 
  />
  
  <input 
    type="email" 
    placeholder="Email" 
    bind:value={email}
    autocomplete="email"
    required 
  />
  
  <input 
    type="password" 
    placeholder="Password" 
    bind:value={password}
    autocomplete="new-password"
    required 
  />
  
  <input 
    type="password" 
    placeholder="Confirm Password" 
    bind:value={confirmPassword}
    autocomplete="new-password"
    required 
  />

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <button type="submit" disabled={loading}>
    {loading ? 'Creating Account...' : 'Sign Up'}
  </button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 30px;
    background: rgba(212, 175, 55, 0.03);
    border: 1px solid #333;
    border-top: none;
    border-radius: 0 0 12px 12px;
  }

  input {
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
    padding: 15px;
    background: #d4af37;
    color: #0a0a0a;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: #dc3545;
    text-align: center;
    margin: 0;
  }
</style>