<script>
  import { account } from '../stores/auth.js'
  import { navigate } from 'svelte-routing'
  import { onMount } from 'svelte'

  const { component: Component, requiresAuth = false } = $props()

  onMount(() => {
    if (requiresAuth && !$account) {
      navigate('/login', { replace: true })
    }
  })
</script>

{#if !requiresAuth || $account}
  <Component />
{/if}