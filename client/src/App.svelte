<script>
  import { Router, Route } from 'svelte-routing'
  import { account } from './stores/auth.js'
  import { connectSocket, disconnectSocket } from './services/socketService.js'
  import { onMount, onDestroy } from 'svelte'
  
  import LoginPage from './pages/LoginPage.svelte'
  import SignupPage from './pages/SignupPage.svelte'
  import Dashboard from './pages/Dashboard.svelte'
  import RouteGuard from './components/RouteGuard.svelte'

  onMount(() => {
    if ($account) {
      connectSocket()
    }
  })

  onDestroy(() => {
    disconnectSocket()
  })
</script>

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