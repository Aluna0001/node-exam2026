<script>
  import socket from '../services/socketService.js'
  import OnlineUsersModal from './OnlineUsersModal.svelte'

  let users = $state([])
  let showModal = $state(false)

  socket.on('online-users', (data) => {
    users = data
  })
</script>

<button class="online-btn" onclick={() => showModal = true}>
  <span class="dot"></span>
  <span class="label">{users.length} online</span>
  <span class="arrow">→</span>
</button>

{#if showModal}
  <OnlineUsersModal {users} onClose={() => showModal = false} />
{/if}

<style>
  .online-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-light);
    font-size: 14px;
    transition: all 0.3s;
    margin: 15px 0;
  }

  .online-btn:hover {
    border-color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2ecc71;
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    text-align: left;
  }

  .arrow {
    color: var(--color-text-muted);
  }
</style>