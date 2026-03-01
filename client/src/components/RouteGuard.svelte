<script>
  import { account } from '../stores/auth.js'
  import { navigate } from 'svelte-routing'
  import { get } from 'svelte/store'

  const { component: Component, requiresAuth = false } = $props()

  $effect(() => {
    if (requiresAuth && !get(account)) {
      navigate('/login', { replace: true })
    }
  })
</script>

{#if !requiresAuth || get(account)}
  <Component />
{/if}