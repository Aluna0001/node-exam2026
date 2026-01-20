<script>
  import { account } from './stores/auth.js'
  import LoginForm from './components/LoginForm.svelte'
  import Dashboard from './pages/Dashboard.svelte'
</script>

{#if $account}
  <Dashboard />
{:else}
  <LoginForm />
{/if}

<!-- Routers -->