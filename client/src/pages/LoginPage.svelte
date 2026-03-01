<script>
  import { login } from '../services/authService.js'
  import { connectSocket } from '../services/socketService.js'
  import { navigate } from 'svelte-routing'
  import toastr from 'toastr'

  let username = $state('')
  let password = $state('')
  let loading = $state(false)

  async function handleLogin(event) {
    event.preventDefault()
    loading = true

    const result = await login(username, password)

    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Login successful!')
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

    <button class="secondary" onclick={() => navigate('/signup')}>
      CREATE ACCOUNT
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

  .divider {
    text-align: center;
    color: var(--color-text-dim);
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
    background: var(--color-border);
  }

  .divider::before { left: 0; }
  .divider::after { right: 0; }

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