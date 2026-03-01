<script>
  import { Router, Route } from 'svelte-routing'
  import { account } from './stores/auth.js'
  import { connectSocket, disconnectSocket } from './services/socketService.js'
  import { checkAuthStatus } from './services/authService.js'
  import { onMount, onDestroy } from 'svelte'
  import { get } from 'svelte/store'

  import LoginPage from './pages/LoginPage.svelte'
  import SignupPage from './pages/SignupPage.svelte'
  import Dashboard from './pages/Dashboard.svelte'
  import RouteGuard from './components/RouteGuard.svelte'

  let loading = $state(true)

  onMount(async () => {
    await checkAuthStatus()

    if (get(account)) {
      connectSocket()
    }

    loading = false
  })

  onDestroy(() => {
    disconnectSocket()
  })
</script>

{#if loading}
  <div class="app-loading"></div>
{:else}
  <Router>
    <Route path="/login">
      <LoginPage />
    </Route>

    <Route path="/signup">
      <SignupPage />
    </Route>

    <Route path="/">
      <RouteGuard component={Dashboard} requiresAuth={true} />
    </Route>
  </Router>
{/if}

<style>
  .app-loading {
    min-height: 100vh;
    background: #0a0a0a;
  }
</style>