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
    background: var(--color-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  h1 {
    font-size: 64px;
    color: var(--color-text);
    margin-bottom: 10px;
    letter-spacing: 8px;
  }

  .subtitle {
    color: var(--color-text-muted);
    font-size: 18px;
    margin-bottom: 60px;
  }

  .auth-box {
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 40px;
    width: 100%;
    max-width: 400px;
  }

  h2 {
    text-align: center;
    color: var(--color-text);
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
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text);
    font-size: 16px;
    font-family: var(--font-family);
  }

  input::placeholder {
    color: var(--color-text-dim);
  }

  button {
    padding: 15px;
    border: none;
    border-radius: var(--radius-md);
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
    border: 1px solid var(--color-text);
    color: var(--color-text);
    margin-top: 15px;
  }

  .secondary:hover {
    background: var(--color-primary-soft);
  }
</style>