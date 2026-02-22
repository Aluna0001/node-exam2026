<script>
  import { signup } from '../services/signupService.js'
  import { connectSocket } from '../services/socketService.js'
  import { navigate } from 'svelte-routing'
  import toastr from 'toastr'

  let signupUsername = $state('')
  let signupEmail = $state('')
  let signupPassword = $state('')
  let confirmPassword = $state('')
  let loading = $state(false)

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
    
    const result = await signup(signupUsername, signupEmail, signupPassword)
    
    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Account created! Welcome!')
      connectSocket()
      navigate('/', { replace: true })
    }
    
    loading = false
  }
</script>

<div class="landing">
  <h1>THE PORTAL</h1>
  <p class="subtitle">Step into the unknown</p>

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

    <button class="secondary" onclick={() => navigate('/login')}>
      Back to Login
    </button>
  </div>
</div>

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