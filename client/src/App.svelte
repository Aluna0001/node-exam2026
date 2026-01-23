<script>
  import { account } from './stores/auth.js'
  import Dashboard from './pages/Dashboard.svelte'
  import { login } from './services/authService.js'
  import toastr from 'toastr'

  let showSignup = $state(false)
  let username = $state('')
  let password = $state('')
  let signupUsername = $state('')
  let signupEmail = $state('')
  let signupPassword = $state('')
  let confirmPassword = $state('')
  let loading = $state(false)

  async function handleLogin(event) {
    event.preventDefault()
    loading = true

    const result = await login(username, password)

    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Login successful!')
    }

    loading = false
  }

  async function handleSignup(event) {
    event.preventDefault()
    
    if (signupPassword !== confirmPassword) {
      toastr.error('Passwords do not match')
      return
    }
    
    if (signupPassword.length < 6) {
      toastr.error('Password must be at least 6 characters')
      return
    }
    
    loading = true
    console.log('Signing up:', signupUsername, signupEmail)
    loading = false
  }
</script>

{#if $account}
  <Dashboard />
{:else}
  <div class="landing">
    <h1>THE PORTAL</h1>
    <p class="subtitle">Step into the unknown</p>

    {#if !showSignup}
      <div class="auth-box">
        <h2>Log in</h2>
        
        <form onsubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            bind:value={username}
            autocomplete="username"
          />
          <input 
            type="password" 
            placeholder="Password" 
            bind:value={password}
            autocomplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'LOG IN'}
          </button>
        </form>

        <div class="divider">or</div>

        <button class="secondary" onclick={() => showSignup = true}>
          CREATE ACCOUNT
        </button>
      </div>
    {:else}
      <div class="auth-box">
        <h2>Create Account</h2>
        
        <form onsubmit={handleSignup}>
          <input 
            type="text" 
            placeholder="Username" 
            bind:value={signupUsername}
            autocomplete="username"
          />
          <input 
            type="email" 
            placeholder="Email" 
            bind:value={signupEmail}
            autocomplete="email"
          />
          <input 
            type="password" 
            placeholder="Password" 
            bind:value={signupPassword}
            autocomplete="new-password"
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            bind:value={confirmPassword}
            autocomplete="new-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'SIGN UP'}
          </button>
        </form>

        <button class="secondary" onclick={() => showSignup = false}>
          Back to Login
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .landing {
    min-height: 100vh;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  h1 {
    font-size: 64px;
    color: #d4af37;
    margin-bottom: 10px;
    letter-spacing: 8px;
  }

  .subtitle {
    color: #888;
    font-size: 18px;
    margin-bottom: 60px;
  }

  .auth-box {
    background: rgba(212, 175, 55, 0.03);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
  }

  h2 {
    text-align: center;
    color: #d4af37;
    margin-bottom: 30px;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
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
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
  }

  button[type="submit"] {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  button[type="submit"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .divider {
    text-align: center;
    color: #666;
    margin: 20px 0;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #333;
  }

  .divider::before {
    left: 0;
  }

  .divider::after {
    right: 0;
  }

  .secondary {
  width: 100%;
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  margin-top: 15px;
}

  .secondary:hover {
    background: rgba(212, 175, 55, 0.1);
  }
</style>