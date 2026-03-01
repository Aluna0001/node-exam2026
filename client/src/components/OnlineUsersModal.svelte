<script>
  const { users, onClose } = $props()
</script>

<div
  class="modal-overlay"
  onclick={onClose}
  onkeydown={(e) => e.key === 'Escape' && onClose()}
  role="button"
  tabindex="0"
  aria-label="Close modal"
>
  <div
    class="modal"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <button class="close-btn" onclick={onClose} aria-label="Close">✕</button>

    <h2>Who's Online</h2>
    <p class="count">{users.length} {users.length === 1 ? 'person' : 'people'} online</p>

    <div class="user-list">
      {#each users as user}
        <div class="user">
          <span class="dot"></span>
          <div class="user-info">
            <span class="username" class:owner={user.role === 'owner'} class:admin={user.role === 'admin'}>
              {user.username}
            </span>
            <span class="zodiac">
              {#if user.showZodiac && user.zodiacSign}
                {user.zodiacSign}
              {:else}
                ✦ Unknown
              {/if}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .modal {
    background: var(--color-surface);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-lg);
    padding: 40px;
    max-width: 400px;
    width: 90%;
    position: relative;
    cursor: default;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: 32px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 32px;
    height: 32px;
  }

  .close-btn:hover {
    color: var(--color-primary-hover);
  }

  h2 {
    color: var(--color-text);
    font-size: 24px;
    margin-bottom: 5px;
  }

  .count {
    color: var(--color-text-muted);
    font-size: 14px;
    margin-bottom: 25px;
  }

  .user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

  .user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--color-primary-faint);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #2ecc71;
    flex-shrink: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .username {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-text);
  }

  .username.owner {
    color: #9b59b6;
  }

  .username.admin {
    color: #ff69b4;
  }

  .zodiac {
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>