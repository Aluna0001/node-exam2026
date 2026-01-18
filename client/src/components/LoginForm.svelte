<script>
    import { login } from '../services/authService'

    let username = $state('')
    let password = $state('')

    async function handleLogin() {
        console.log('Login attempt')
        const result = await login(username, password)

        if (result.error) {
            console.error('Login failed:', result.error)
        } else {
            console.log('Login success', result)
        }
    }
    
</script>

<h1>Login</h1>

<input type="text" placeholder="Username" bind:value={username}/>
<input type="password" placeholder="Password" bind:value={password}/>

<button onclick={handleLogin}>Login</button>
<p>Du skrev: {username}</p>

<style>

</style>