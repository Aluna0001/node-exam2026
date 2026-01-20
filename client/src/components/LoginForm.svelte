<script>
  import { login } from '../services/authService'
  import toastr from 'toastr'

  let username = $state('')
  let password = $state('')

  async function handleLogin(event) {
    event.preventDefault()
    console.log('Login attempt')
    const result = await login(username, password)

    if (result.error) {
      toastr.error(result.error)
    } else {
      toastr.success('Login successful!')
    }
  }
</script>

<h1>Login</h1>

<form onsubmit={handleLogin}>
  <input 
    type="text" 
    placeholder="Username" 
    bind:value={username} 
    autocomplete="username"
    required 
  />
  <input 
    type="password" 
    placeholder="Password" 
    bind:value={password} 
    autocomplete="current-password"
    required 
  />
  <button type="submit">Login</button>
</form>

<style>

</style>